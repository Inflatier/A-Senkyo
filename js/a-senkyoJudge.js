function judgeKwkm(town,chou,ban,gou){
    var id = 0;

    switch (town){
        case "勝田町":
            id = 1;
            break;

        case "勝田南":
            if (chou == 1 || chou == 2) id = 1;
            break;

        case "茅ケ崎東":
            if (chou == 1) {
                if (ban == 1) {
                    id = 2;
                }
                else id = 30;
            }
            break;

        case "茅ケ崎南":
            if (chou == 1 || chou == 2 || chou == 3) id = 2;
            else id = 22
            break;

        case "牛久保東":
            if (chou == 1 || chou == 2) id = 3;
            if (chou == 3) {
                if (ban <= 8) id = 3;
                else if(ban <= 11) id = 4;
                else if(ban <= 13) id = 3;
                else id = 4;
            }
            break;

        case "大棚町":
            if (ban >= 420) id = 3;
            else id = 4;
            break;

        case "大棚西":
            id = 3;
            break;

        case "南山田町":
            if (ban <= 4592) id = 4;
            else if (ban <= 4593) id = 23;
            else if (ban <= 4794) id = 4;
            else if (ban <= 4809) id = 23;
            else if (ban <= 4812) id = 4;
            else if (ban <= 4813) id = 23;
            else if (ban == 4814) {
                if (gou == 1) id = 23;
                else id = 4;
            }
            else if (ban <= 4831) id = 4;
            else if (ban <= 4898) id = 23;
            else if (ban <= 4901) id = 4;
            else if (ban <= 4908) id = 23;
            else id = 4;
            break;

        case "早渕":
            if (chou <= 2) id = 18;
            if (chou <= 3) id = 5;
            break;

        case "東山田町":
            if (ban <= 999) id = 5;
            else if (ban <= 1248) id = 6;
            else if (ban <= 1252) id = 5;
            else if (ban <= 1254) id = 6;
            else if (ban <= 1316) id = 5;
            else if (ban <= 1329) id = 6;
            else if (ban <= 1346) id = 5;
            else if (ban <= 1372) id = 6;
            else if (ban <= 1373) id = 5;
            else if (ban <= 1382) id = 6;
            else if (ban <= 1515) id = 5;
            else if (ban <= 1541) id = 6;
            else if (ban <= 1551) id = 5;
            else 6;
            break;

        case "東山田":
            if (chou <= 2) id = 29;
            else if (chou <= 4) id = 6;
            break;

        case "すみれが丘":
            id = 7;
            break;

        case "牛久保":
            if (chou <= 2) id = 31;
            else if (chou <= 3) id = 7;
            break;

        case "牛久保町":
            if (ban == 1835) {
                if (gou == 2) id = 8;
            }
            else id = 7
            break;

        case "中川":
            if (chou <= 1) id = 20;
            else if (chou <= 3) id = 8;
            else if (chou <= 4) id = 20;
            else if (chou <= 8) id = 24;
            break;

        case "あゆみが丘":
            id = 8;
            break;

        case "川和町":
            if (ban <= 1230) id = 25;
            else id = 9;
            break;

        case "加賀原":
            if (chou <= 1) {
                if (ban <= 23) id = 21;
                else if (ban <= 25) id = 10;
                else if (ban <= 31) id = 21;
                else if (ban <= 34) id = 10;
                else if (ban <= 35) id = 21;
                else id = 10;
            }
            else if (chou <= 2) id = 10;
            break;

        case "佐江戸町":
            id = 10;
            break;

        case "池辺町":
            if (ban <= 6) id = 16;
            else if (ban <= 20) id = 11;
            else if (ban <= 43) id = 16;
            else if (ban <= 55) id = 11;
            else if (ban <= 60) id = 16;
            else if (ban <= 80) id = 11;
            else if (ban <= 83) id = 16;
            else if (ban <= 104) id = 11;
            else if (ban <= 1222) id = 16;
            else if (ban <= 1235) id = 11;
            else if (ban <= 1239) id = 16;
            else if (ban <= 1244) id = 11;
            else if (ban <= 1270) id = 16;
            else if (ban <= 1307) id = 11;
            else if (ban <= 1365) id = 16;
            else if (ban <= 2221) id = 11;
            else if (ban <= 2241) id = 16;
            else if (ban <= 2261) id = 11;
            else if (ban <= 2627) id = 16;
            else if (ban <= 3937) id = 11;
            else if (ban <= 4582) id = 16;
            else if (ban <= 5481) id = 11;
            else if (ban <= 5486) id = 16;
            else if (ban <= 5499) id = 11;
            else if (ban <= 5641) id = 16;
            else if (ban <= 6999) id = 11;
            else if (ban <= 7010) id = 16;
            else if (ban <= 7011) {
                if (ban == 6) id = 16;
            }
            break;

        case "川向町":
            if (ban <= 634) id = 11;
            else if (ban <= 800) id = 12;
            else if (ban <= 1080) id = 11;
            else id = 12;
            break;

        case "大熊町":
            id = 12;
            break;

        case "折本町":
            id = 12;
            break;

        case "荏田東町":
            id = 13;
            break;

        case "荏田東":
            if (chou <= 2) id = 27;
            else if (chou <= 3) id = 13;
            else if (chou <= 4) id = 27;
            break;

        case "荏田南町":
            id = 13;
            break;

        case "荏田南":
            if (chou <= 3) id = 14;
            else if (chou <= 5) id = 13;
            break;

        case "大丸":
            id = 14;
            break;

        case "葛が谷":
            id = 15;
            break;

        case "高山":
            id = 15;
            break;

        case "平台":
            if (ban <= 26) id = 22;
            else id = 15;
            break;

        case "仲町台":
            if (chou <= 5) id = 17;
            break;

        case "桜並木":
            if (ban <= 6) id = 22;
            else id = 17;
            break;

        case "新栄町":
            id = 18;
            break;

        case "北山田":
            if (chou <= 1) id = 29;
            else if (chou <= 3) id = 28;
            else if (chou <= 4) id = 31;
            else if (chou <= 6) id = 19;
            else if (chou <= 7) id = 29;
            break;

        case "牛久保西":
            if (chou <= 1) id = 31;
            else if (chou <= 3) id = 24;
            else if (chou <= 4) id = 20;
            break;

        case "川和台":
            id = 21;
            break;

        case "二の丸":
            id = 21;
            break;

        case "富士見が丘":
            id = 21;
            break;

        case "見花山":
            id = 21;
            break;

        case "長坂":
            id = 22;
            break;

        case "中川中央":
            if (chou <= 2) id = 24;
            break;

        case "東方町":
            id = 26;
            break;

        case "茅ケ崎町":
            id = 30;
            break;

        case "茅ヶ崎中央":
            id = 30;
            break;
    }

    return id;

}