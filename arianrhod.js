var Nucleareal = Nucleareal || {};

function replaceSpaceToComma(str) {
    return str.replace(/\s+/g, ",").replace(/,+/g, ",");
}

function getAblLine(reg) {
    return replaceSpaceToComma(Nucleareal.text.match(reg)[0]).split(",");
}

function createLast(arr) {
    return arr[arr.length - 2] + arr[arr.length - 1].replace(/\)/i, "").replace(/\(/i, "+");
}

function getSkills(reg) {
    return Nucleareal.text.match(reg);
}

function appendToChatPalette(abls, expl) {
    Nucleareal.resultText += abls + " " + expl + "\n";
}

function appendAbilityToChatPalette(abls, expl, abl) {
    appendToChatPalette(abls + "+2D" + Nucleareal[abl], expl);
}

function appendSkillToChatPalette(arr, title) {
    if(arr == null) return;
    
    appendToChatPalette("◆◆◆◆" + title + "◆◆◆◆", "");
    arr.forEach(function(value) {
        var arrs = value.replace(/\s/g, "").split("/");
        var writes = arrs[0] + "/コスト:" + arrs[5] + "/判定:" + arrs[2] + "/対象:" + arrs[3] + "/射程:" + arrs[4] + "/制限:" + arrs[6];
        appendToChatPalette(writes, "");
    });
}

function appendAbilityPowers(skills) {
    
    skills.forEach(function(value) {
        var res = value.match(/@\[(筋力|器用|敏捷|知力|感知|精神|幸運):(.*?)\]/);
        if(res == null) return;
        Nucleareal[res[1]] += res[2];
    });
}


function convertPalette() {
    
    var text = document.getElementById("source").value;
    Nucleareal.text = text;
    Nucleareal.筋力 = "";
    Nucleareal.器用 = "";
    Nucleareal.敏捷 = "";
    Nucleareal.知力 = "";
    Nucleareal.感知 = "";
    Nucleareal.精神 = "";
    Nucleareal.幸運 = "";
    
    var reg_abl = /=合計=.*/i;
    var reg_hit = /命中判定.*/i;
    var reg_atk = /攻撃力.*/i;
    var reg_avd = /回避判定.*/i;
    //var reg_AR = /物理防御.*/i;
    //var reg_MR = /魔法防御.*/i;
    //var reg_ACTION = /行動値.*/i;
    //var reg_MOVE = /移動力.*/i;
    
    var reg_tpfd = /罠探知.*D\)/i;
    var reg_tprm = /罠解除.*D\)/i;
    var reg_cau = /危険感知.*D\)/i;
    var reg_enm = /敵識別.*D\)/i;
    var reg_jdg = /物品鑑定.*D\)/i;
    var reg_mgc = /魔術.*D\)/i;
    var reg_msc = /呪歌.*D\)/i;
    var reg_grd = /錬金術.*D\)/i;
    
    var abilities = getAblLine(reg_abl, text);
    
    var 筋力 = abilities[1];
    var 器用 = abilities[2];
    var 敏捷 = abilities[3];
    var 知力 = abilities[4];
    var 感知 = abilities[5];
    var 精神 = abilities[6];
    var 幸運 = abilities[7];
    
    var 命中判定全 = getAblLine(reg_hit);
    var 命中判定TMP = 命中判定全[命中判定全.length-1].replace(/）/i, "").split("（");
    var 命中判定右 = 命中判定全[命中判定全.length - 2].replace(/\//g, "") + "+" + 命中判定TMP[1];
    var 命中判定左 = 命中判定TMP[0] + "+" + 命中判定TMP[1];
    
    var 攻撃力全 = getAblLine(reg_atk);
    var 攻撃力TMP = 攻撃力全[命中判定全.length - 1].replace(/）/i, "").split("（");
    var 攻撃力右 = 攻撃力全[攻撃力全.length - 2].replace(/\//g, "") + "+" + 攻撃力TMP[1];
    var 攻撃力左 = 攻撃力TMP[0] + "+" + 攻撃力TMP[1];
    
    var 回避判定 = getAblLine(reg_avd);
    回避判定 = 回避判定[回避判定.length - 2] + 回避判定[回避判定.length - 1].replace(/）/i, "").replace(/（/i, "+");
    
    var 罠探知 = createLast(getAblLine(reg_tpfd));
    var 罠解除 = createLast(getAblLine(reg_tprm));
    var 危険感知 = createLast(getAblLine(reg_cau));
    var 敵識別 = createLast(getAblLine(reg_enm));
    var 物品鑑定 = createLast(getAblLine(reg_jdg));
    var 魔術 = createLast(getAblLine(reg_mgc));
    var 呪歌 = createLast(getAblLine(reg_msc));
    var 錬金術 = createLast(getAblLine(reg_grd));
    
    var セットアップスキル = getSkills(/《.*?》[^\/\n]*\/セットアップ.*/g);
    var イニシアチブスキル = getSkills(/《.*?》[^\/\n]*\/イニシアチブ.*/g);
    var ムーブスキル = getSkills(/《.*?》[^\/\n]*\/ムーブ.*/g);
    var マイナースキル = getSkills(/《.*?》[^\/\n]*\/マイナー.*/g);
    var メジャースキル = getSkills(/《.*?》[^\/\n]*\/メジャー.*/g);
    var クリンナップスキル = getSkills(/《.*?》[^\/\n]*\/クリンナップ.*/g);
    var 判定直前スキル = getSkills(/《.*?》[^\/\n]*\/判定直前.*/g);
    var 判定直後スキル = getSkills(/《.*?》[^\/\n]*\/判定直後.*/g);
    var DR直前スキル = getSkills(/《.*?》[^\/\n]*\/DR直前.*/g);
    var DR直後スキル = getSkills(/《.*?》[^\/\n]*\/DR直後.*/g);
    var スキル時スキル = getSkills(/《.*?》[^\/\n]*\/《.*?》.*/g);
    var パッシブスキル = getSkills(/《.*?》[^\/\n]*\/パッシ[ブヴ].*/g);
    var アイテムスキル = getSkills(/《.*?》[^\/\n]*\/アイテム.*/g);
    var 効果参照スキル = getSkills(/《.*?》[^\/\n]*\/効果参照.*/g);
    var 特殊スキル = getSkills(/《.*?》[^\/\n]*\/特殊.*/g);
    
    appendAbilityPowers(パッシブスキル);
    
    Nucleareal.resultText = "";
    
    appendAbilityToChatPalette(筋力, "【筋力】判定", "筋力");
    appendAbilityToChatPalette(器用, "【器用】判定", "器用");
    appendAbilityToChatPalette(敏捷, "【敏捷】判定", "敏捷");
    appendAbilityToChatPalette(知力, "【知力】判定", "知力");
    appendAbilityToChatPalette(感知, "【感知】判定", "感知");
    appendAbilityToChatPalette(精神, "【精神】判定", "精神");
    appendAbilityToChatPalette(幸運, "【幸運】判定", "幸運");
    appendToChatPalette(命中判定右, "命中判定(右)");
    appendToChatPalette(命中判定左, "命中判定(左)");
    appendToChatPalette(攻撃力右, "攻撃力(右)");
    appendToChatPalette(攻撃力左, "攻撃力(左)");
    appendToChatPalette(回避判定, "回避判定");
    appendToChatPalette(罠探知, "罠探知");
    appendToChatPalette(罠解除, "罠解除");
    appendToChatPalette(危険感知, "危険感知");
    appendToChatPalette(敵識別, "敵識別");
    appendToChatPalette(物品鑑定, "物品鑑定");
    appendToChatPalette(魔術, "魔術判定");
    appendToChatPalette(呪歌, "呪歌判定");
    appendToChatPalette(錬金術, "錬金術判定");
    appendToChatPalette("", "");
    
    document.getElementById("destination").value = Nucleareal.resultText;
    
    appendSkillToChatPalette(セットアップスキル, "セットアップスキル");
    appendSkillToChatPalette(イニシアチブスキル, "イニシアチブスキル");
    appendSkillToChatPalette(ムーブスキル, "ムーブスキル");
    appendSkillToChatPalette(マイナースキル, "マイナースキル");
    appendSkillToChatPalette(メジャースキル, "メジャースキル");
    appendSkillToChatPalette(スキル時スキル, "スキル時スキル");
    appendSkillToChatPalette(判定直前スキル, "判定直前スキル");
    appendSkillToChatPalette(判定直後スキル, "判定直後スキル");
    appendSkillToChatPalette(DR直前スキル, "DR直前スキル");
    appendSkillToChatPalette(DR直後スキル, "DR直後スキル");
    appendSkillToChatPalette(効果参照スキル, "効果参照スキル");
    appendSkillToChatPalette(クリンナップスキル, "クリンナップスキル");
    appendSkillToChatPalette(パッシブスキル, "パッシブスキル");
    appendSkillToChatPalette(アイテムスキル, "アイテムスキル");
    appendSkillToChatPalette(特殊スキル, "特殊スキル");
    
    document.getElementById("destination").value = Nucleareal.resultText;
}