var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NM", "NJ", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer, lang = "en") {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        if(lang === "en") {
            results(this.getQuestionIndex().getTitle(), this.getQuestionIndex().getText());
        } else if (lang === "vi") {
            results(this.getQuestionIndex().getTitle(), this.getQuestionIndex().getText(), "vi");
        } else if (lang === "kor") {
            results(this.getQuestionIndex().getTitle(), this.getQuestionIndex().getText(), "kor");
        } else if (lang === "ger") {
            results(this.getQuestionIndex().getTitle(), this.getQuestionIndex().getText(), "ger");
        } else if (lang === "punj") {
            results(this.getQuestionIndex().getTitle(), this.getQuestionIndex().getText(), "punj");
        }
    }

    this.questionIndex++;
}

 
Quiz.prototype.getQuestionLen = function() {
    return this.questions.length;
}

 
Quiz.prototype.isEnded = function() {
    if (typeof(this.questions) === 'object') {
        var arr = $.map(this.questions, function(value) {
            return [value];
        });
        console.log(arr);
        console.log(this.questionIndex);
        return this.questionIndex === arr.length;
    }
    return this.questionIndex === this.questions.length;
}
 
function Question(text, choices, answer, title, descr) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.title = title;
    this.descr = descr;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

Question.prototype.getTitle = function() {
    return this.title;
}

Question.prototype.getText = function() {
    return this.descr;
}

/*
/
/ Populating the quiz
/
*/

function getStarted() {
    var element = document.getElementById("quiz");
    element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\" onclick=\"chooseLanguage()\">Get Started</div>";
}

function chooseLanguage() {
    var element = document.getElementById("quiz");
    element.innerHTML = 
    "<h1>Unemployment Qualification Test</h1>" +
    "<p id=\"question\">Select your language</p>" + 
    "<div class=\"buttons\">" + 
        "<button id=\"btn0\" onclick=\"chooseQuiz();\">" +
            "<span id=\"choice0\">English</span>" +
        "</button>" +
        "<button id=\"btn1\" onclick=\"chooseQuiz('vi');\">" + 
            "<span id=\"choice1\">Tiếng Việt</span>" +
        "</button>" +
        "<button id=\"btn2\" onclick=\"chooseQuiz('kor');\">" +
            "<span id=\"choice2\">한국어</span>" +
        "</button>" + 
        "<button id=\"btn3\" onclick=\"chooseQuiz('ger');\">" +
            "<span id=\"choice3\">Deutsche</span>" +
        "</button>" + 
        "<button id=\"btn4\" onclick=\"chooseQuiz('punj');\">" +
            "<span id=\"choice4\">ਪੰਜਾਬੀ</span>" +
        "</button>" + 
    "</div>";
}
 
function populate(lang = "en", type="not-covid", guess) {
    if(quiz.isEnded() && !this.getQuestionIndex().isCorrectAnswer(guess)) {
        if (type === "covid") {
            if (lang === "en"){
                notQualified(); 
            } else if (lang === "vi") {
                notQualified("vi"); 
            } else if (lang === "kor") {
                notQualified("kor");
            } else if (lang === "ger") {
                notQualified("ger");
            } else if (lang === "punj") {
                notQualified("punj");
            }
        } else if (type === "not-covid") {
            if (lang === "en"){
                qualified(); 
            } else if (lang === "vi") {
                qualified("vi");
            } else if (lang === "kor") {
                qualified("kor");
            } else if (lang === "ger") {
                qualified("ger");
            } else if (lang === "punj") {
                notQualified("punj");
            }
        }
        
    } else {
        var element = document.getElementById("question");

        element.innerHTML = quiz.getQuestionIndex().text;
        
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            if (type === "covid") {
                if (lang === "en"){
                    guess("btn" + i, choices[i], "en", "covid");
                } else if (lang === "vi") {
                    guess("btn" + i, choices[i], "vi", "covid");
                } else if (lang === "kor") {
                    guess("btn" + i, choices[i], "kor", "covid")
                } else if (lang === "ger") {
                    guess("btn" + i, choices[i], "ger", "covid")
                } else if (lang === "punj") {
                    guess("btn" + i, choices[i], "punj", "covid")
                }
            } else {
                if (lang === "en"){
                    guess("btn" + i, choices[i], "en", "not-covid");
                } else if (lang === "vi") {
                    guess("btn" + i, choices[i], "vi", "not-covid");
                } else if (lang === "kor") {
                    guess("btn" + i, choices[i], "kor", "not-covid");
                } else if (lang === "ger") {
                    guess("btn" + i, choices[i], "ger", "not-covid");
                } else if (lang === "punj") {
                    guess("btn" + i, choices[i], "punj", "not-covid");
                } 
            }
            
        } 
    }
};
 
function guess(id, guess, lang="en", type="not-covid") {
    var button = document.getElementById(id);
    button.onclick = function() {
        if (type === "covid") {
            switch(lang) {
                case "en":
                    quiz.guess(guess, "en", "covid");
                    populate("en", "covid", guess);                    
                    break;
                case "vi":
                    quiz.guess(guess,"vi", "covid");
                    populate("vi", "covid", guess);                      
                    break;
                case "kor":
                    quiz.guess(guess,"kor", "covid");
                    populate("kor", "covid", guess);                      
                    break;
                case "ger":
                    quiz.guess(guess,"ger", "covid");
                    populate("ger", "covid", guess);                      
                    break;
                case "punj":
                    quiz.guess(guess,"punj", "covid");
                    populate("punj", "covid", guess);                      
                    break;
                default:
                    quiz.guess(guess, "en", "covid");
                    populate("en", "covid", guess);            
            }
        } else {
            switch(lang) {
                case "en":
                    quiz.guess(guess, "en", "not-covid");
                    populate("en", "not-covid", guess);                    
                    break;
                case "vi":
                    quiz.guess(guess,"vi", "not-covid");
                    populate("vi", "not-covid", guess);                      
                    break;
                case "kor":
                    quiz.guess(guess,"kor", "not-covid");
                    populate("kor", "not-covid", guess);                      
                    break;
                case "ger":
                    quiz.guess(guess,"ger", "not-covid");
                    populate("ger", "not-covid", guess);                      
                    break;
                case "punj":
                    quiz.guess(guess,"punj", "not-covid");
                    populate("punj", "not-covid", guess);                      
                    break;
                default:
                    quiz.guess(guess, "en", "not-covid");
                    populate("en", "not-covid", guess);           
            }
        }
        
    }
};

function chooseQuiz(lang="en") {
    var element = document.getElementById("quiz");
    switch(lang) {
        case "en":
            element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\">Are you seeking relief from COVID-19?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz();\"><span id=\"choice0\">Yes</span></button><button id=\"btn1\" onclick=\"chooseState();\"><span id=\"choice1\">No</span></button></div>";
            break;
        case "vi":
            element.innerHTML = "<h1>Kiểm tra trình độ thất nghiệp</h1><p id=\"question\">Bạn đang tìm kiếm sự cứu trợ từ COVID-19?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz('vi');\"><span id=\"choice0\">Đúng</span></button><button id=\"btn1\" onclick=\"redoQuiz('vi');\"><span id=\"choice1\">Không</span></button></div>";
            break;
        case "kor":
            element.innerHTML = "<h1>실업수당 조건 시험</h1><p id=\"question\">COVID-19 으로 인한 피해에 대해 복지를 원하십니까?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz('kor');\"><span id=\"choice0\">예</span></button><button id=\"btn1\" onclick=\"redoQuiz('kor');\"><span id=\"choice1\">아니요</span></button></div>";
            break;
        case "ger":
            element.innerHTML = "<h1>Qualifikationsprüfung zur Arbeitslosigkeit</h1><p id=\"question\">Bemühen Sie sich um Erleichterung wegen der COVID-19-Pandemie?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz('ger');\"><span id=\"choice0\">Ja</span></button><button id=\"btn1\" onclick=\"redoQuiz('ger');\"><span id=\"choice1\">Nein</span></button></div>";
            break;
        case "punj":
            element.innerHTML = "<h1>ਬੇਰੁਜ਼ਗਾਰੀ ਮਿਲਣ ਦਾ ਟੈਸਟ</h1><p id=\"question\">ਤੁਸੀੰ ਕੋਰੋਨਾਵਾਈਰਸ ਤੋਂ ਰਾਹਤ ਚਾਹੁੰਦੇ ਹੋ?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz('punj');\"><span id=\"choice0\">ਜੀ</span></button><button id=\"btn1\" onclick=\"redoQuiz('punj');\"><span id=\"choice1\">ਨਹੀਂ</span></button></div>";
            break;
        default:
            element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\">Are you seeking relief from COVID-19?</p><div class=\"buttons\"><button id=\"btn0\" onclick=\"covidQuiz();\"><span id=\"choice0\">Yes</span></button><button id=\"btn1\" onclick=\"chooseState();\"><span id=\"choice1\">No</span></button></div>";
    }
}

function redoQuiz(lang="en", state="NY", ) {
    var element = document.getElementById("quiz");

    switch(lang) {
        case "en":
            element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";

            switch(state) {
                case "AL":
                    quiz = new Quiz(al);
                    break;
                case "AK":
                    quiz = new Quiz(ak);
                    break;
                case "AZ":
                    quiz = new Quiz(az);
                    break;
                case "AR":
                    quiz = new Quiz(ar);
                    break;
                case "CA":
                    quiz = new Quiz(ca);
                    break;
                case "CO":
                    quiz = new Quiz(co);
                    break;
                case "CT":
                    quiz = new Quiz(ct);
                    break;
                case "DE":
                    quiz = new Quiz(de);
                    break;
                case "DC":
                    quiz = new Quiz(dc);
                    break;
                case "FL":
                    quiz = new Quiz(fl);
                    break
                case "GA":
                    quiz = new Quiz(ga);
                    break;
                case "HI":
                    quiz = new Quiz(hi);
                    break;
                case "ID":
                    quiz = new Quiz(id);
                    break;
                case "IL":
                    quiz = new Quiz(il);
                    break;
                case "IN":
                    quiz = new Quiz(ind);
                    break;
                case "IA":
                    quiz = new Quiz(ia);
                    break;
                case "KS":
                    quiz = new Quiz(ks);
                    break;
                case "KY":
                    quiz = new Quiz(ky);
                    break;
                case "LA":
                    quiz = new Quiz(la);
                    break;
                case "ME":
                    quiz = new Quiz(me);
                    break;
                case "MD":
                    quiz = new Quiz(md);
                    break;
                case "MA":
                    quiz = new Quiz(ma);
                    break;
                case "MI":
                    quiz = new Quiz(mi);
                    break;
                case "MN":
                    quiz = new Quiz(mn);
                    break;
                case "MS":
                    quiz = new Quiz(ms);
                    break;
                case "MO":
                    quiz = new Quiz(mo);
                    break;
                case "MT":
                    quiz = new Quiz(mt);
                    break;
                case "NE":
                    quiz = new Quiz(ne);
                    break
                case "NV":
                    quiz = new Quiz(nv);
                    break;
                case "NH":
                    quiz = new Quiz(nh);
                    break;
                case "NJ":
                    quiz = new Quiz(nj);
                    break;
                case "NM":
                    quiz = new Quiz(nm);
                    break;
                case "NY":
                    quiz = new Quiz(ny);
                    break;
                case "NC":
                    quiz = new Quiz(nc);
                    break;
                case "ND":
                    quiz = new Quiz(nd);
                    break;
                case "OH":
                    quiz = new Quiz(oh);
                    break;
                case "OK":
                    quiz = new Quiz(ok);
                    break;        
                case "OR":
                    quiz = new Quiz(or);
                    break;
                case "PA":
                    quiz = new Quiz(pa);
                    break;
                case "RI":
                    quiz = new Quiz(ri);
                    break;
                case "SC":
                    quiz = new Quiz(sc);
                    break;
                case "SD":
                    quiz = new Quiz(sd);
                    break;
                case "TN":
                    quiz = new Quiz(tn);
                    break;
                case "TX":
                    quiz = new Quiz(tx);
                    break
                case "UT":
                    quiz = new Quiz(ut);
                    break;
                case "VT":
                    quiz = new Quiz(vt);
                    break;
                case "VA":
                    quiz = new Quiz(va);
                    break;
                case "WA":
                    quiz = new Quiz(wa);
                    break;
                case "WV":
                    quiz = new Quiz(wv);
                    break;
                case "WI":
                    quiz = new Quiz(wi);
                    break;
                case "WY":
                    quiz = new Quiz(wy);
                    break;
                default:
                    quiz = new Quiz(nj);
            } 
            populate("en", "not-covid", guess);
            break;
        case "vi":
            element.innerHTML = "<h1>Kiểm tra trình độ thất nghiệp</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(baseViet);
            populate("vi", "not-covid", guess);
            break;
        case "kor":
            element.innerHTML = "<h1>실업수당 조건 시험</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(baseKore);
            populate("kor", "not-covid", guess);
            break;
        case "ger":
            element.innerHTML = "<h1>Qualifikationsprüfung zur Arbeitslosigkeit</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(baseGerm);
            populate("ger", "not-covid", guess);
            break;
        case "punj":
            element.innerHTML = "<h1>ਬੇਰੁਜ਼ਗਾਰੀ ਮਿਲਣ ਦਾ ਟੈਸਟ</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(basePunj);
            populate("punj", "not-covid", guess);
            break;
        default:
            element.innerHTML = "<h1>Kiểm tra trình độ thất nghiệp</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            uiz = new Quiz(baseViet);
            populate("vi", "not-covid", guess);
    }
}

function covidQuiz(lang="en") {
    var element = document.getElementById("quiz");
    switch(lang) {
        case "en":
            element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19);
            populate("en", "covid", guess);
            break;
        case "vi":
            element.innerHTML = "<h1>Kiểm tra trình độ thất nghiệp</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19Viet);
            populate("vi", "covid", guess);
            break;
        case "kor":
            element.innerHTML = "<h1>실업수당 조건 시험</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19Kore);
            populate("kor", "covid", guess);
            break;
        case "ger":
            element.innerHTML = "<h1>Qualifikationsprüfung zur Arbeitslosigkeit</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19Germ);
            populate("ger", "covid", guess);
            break;
        case "punj":
            element.innerHTML = "<h1>ਬੇਰੁਜ਼ਗਾਰੀ ਮਿਲਣ ਦਾ ਟੈਸਟ</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19Punj);
            populate("punj", "covid", guess);
            break;
        default:
            element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\"></p><div class=\"buttons\"><button id=\"btn0\"><span id=\"choice0\"></span></button><button id=\"btn1\"><span id=\"choice1\"></span></button></div>";
            quiz = new Quiz(covid19);
            populate("en", "covid", guess);
    }
}

function chooseState() {
    var element = document.getElementById("quiz");
    var buttons = ''
    for (var i = 0; i < states.length; i++) {
        buttons += "<button id=\"btn0\" onclick=\"redoQuiz('en', '" + states[i] + "');\"><span id=\"choice1\">" + states[i] + "</span></button>";
    }

    element.innerHTML = "<h1>Unemployment Qualification Test</h1><p id=\"question\">Select your state</p><div class=\"buttons\">" + buttons + "</div>";
}
 
function results(title, text,lang="en") {
    var gameOverHTML = "<h1>"+title+"</h1>";
    switch(lang) {
        case "en":
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
            break;
        case "vi":
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Làm bài kiểm tra một lần nữa</button></center>";
            break;
        case "kor":
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">퀴즈 다시 치기</button></center>";
            break;
        case "ger":
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">ਕਵਿਜ਼ ਨੂੰ ਫਿਰ ਲਓ</button></center>";
            break;
        case "punj":
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Bitt nehmen Sie die Prüfung nochmal</button></center>";
            break;
        default:
            gameOverHTML += "<h2 id='score'> "+text+"</h2> <div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function notQualified(lang="en") {
    switch(lang) {
        case "en":
            var gameOverHTML = "<h1>Not Qualified</h1>";
            gameOverHTML += "<h2 id='score'>Unfortunately, you are not qualified to receive unemployment benefits in your state.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
            break;
        case "vi":
            var gameOverHTML = "<h1>Không chất lượng</h1>";
            gameOverHTML += "<h2 id='score'>Thật không may, bạn không đủ điều kiện để nhận trợ cấp thất nghiệp trong tiểu bang của bạn.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Làm bài kiểm tra một lần nữa</button></center>";
            break;
        case "kor":
            var gameOverHTML = "<h1>조건불충족</h1>";
            gameOverHTML += "<h2 id='score'>유감스럽게도 귀하는 실업 수당을 받을 수 있는 조건 불충족 입니다.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">퀴즈 다시 치기</button></center>";
            break;
        case "ger":
            var gameOverHTML = "<h1>Nicht berechtigt</h1>";
            gameOverHTML += "<h2 id='score'>Leider sind Sie nicht berechtigt, Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat zu erhalten.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Bitt nehmen Sie die Prüfung nochmal</button></center>";
            break;
        case "punj":
            var gameOverHTML = "<h1>ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰੋਗੇ</h1>";
            gameOverHTML += "<h2 id='score'>ਤੁਹਾਨੂੰ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਨਹੀਂ ਹੋਣਗੇ.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">ਕਵਿਜ਼ ਨੂੰ ਫਿਰ ਲਓ</button></center>";
            break;
        default:
            var gameOverHTML = "<h1>Not Qualified</h1>";
            gameOverHTML += "<h2 id='score'>Unfortunately, you are not qualified to receive unemployment benefits in your state.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function qualified(lang="en") {
    switch(lang) {
        case "en":
            var gameOverHTML = "<h1>Qualified</h1>";
            gameOverHTML += "<h2 id='score'>You are qualified to receive unemployment benefits in your state. Apply with your local [<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>].</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
            break;
        case "vi":
            var gameOverHTML = "<h1>Đủ tiêu chuẩn</h1>";
            gameOverHTML += "<h2 id='score'>Bạn không đủ điều kiện để nhận trợ cấp thất nghiệp trong tiểu bang của bạn. Áp dụng với địa phương của bạn.<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Làm bài kiểm tra một lần nữa</button></center>";
            break;
        case "kor":
            var gameOverHTML = "<h1>조건충족</h1>";
            gameOverHTML += "<h2 id='score'>귀하는 현제 거주하시는 주에서 실업수당을 받을수 있습니다. 귀하의 주 노동부에 지원하십시오.<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">퀴즈 다시 치기</button></center>";
            break;
        case "ger":
            var gameOverHTML = "<h1>Đủ tiêu chuẩn</h1>";
            gameOverHTML += "<h2 id='score'>Sie sind zum Erhalten der Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat berechtigt. Bitte bei Ihrem dortigen Arbeitsamt (Department of Labor) darum bewerben.<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Bitt nehmen Sie die Prüfung nochmal</button></center>";
            break;
        case "punj":
            var gameOverHTML = "<h1>ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋਗੇ</h1>";
            gameOverHTML += "<h2 id='score'>ਤੁਸੀਂ ਆਪਣੀ ਸਟੇਟ ਦੇ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰਨ ਦੇ ਯੋਗ ਹੋ. ਆਪਣੇ ਸਥਾਨਕ ਲੇਬਰ ਡਿਪਾਰਟਮੈਂਟ ਨਾਲ ਅਪਲਾਈ ਕਰੋ.<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>.</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">ਕਵਿਜ਼ ਨੂੰ ਫਿਰ ਲਓ</button></center>";
            break;
        default:
            var gameOverHTML = "<h1>Qualified</h1>";
            gameOverHTML += "<h2 id='score'>You are qualified to receive unemployment benefits in your state. Apply with your local [<a href=\"https://www.careeronestop.org/LocalHelp/UnemploymentBenefits/Find-Unemployment-Benefits.aspx?location=CA&keyword=&persist=true&ajax=0\">Department of Labor</a>].</h2><div class=\"buttons\"><center><button id=\"btn2\" onclick=\"getStarted(); \">Take the quiz again</button></center>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

/*
/
/ Viet questions
/
*/


var covid19Viet = [
    new Question("Chỗ làm có cắt giảm giờ làm của anh/chị bởi ảnh hưởng của chính sách phòng chống Covid-19 không?", ["Đúng", "Không"], "Đúng", "Đủ tiêu chuẩn", "Bạn có thể đủ điều kiện để thất nghiệp theo đạo luật cứu trợ coronavirus quốc gia. Bạn nên đăng ký bảo hiểm thất nghiệp."),
    new Question("Anh/chị có tự cách ly vì Covid-19 và không thể đi làm không?", ["Đúng", "Không"], "Đúng", "Đủ tiêu chuẩn", "Bạn có thể đủ điều kiện để thất nghiệp theo đạo luật cứu trợ coronavirus quốc gia. Bạn nên đăng ký bảo hiểm thất nghiệp."),
    new Question("Anh/chị có không thể đi làm vì sợ tiếp xúc với Covid-19 ở chỗ làm không?", ["Đúng", "Không"], "Đúng", "Đủ tiêu chuẩn", "Bạn có thể đủ điều kiện để thất nghiệp theo đạo luật cứu trợ coronavirus quốc gia. Bạn nên đăng ký bảo hiểm thất nghiệp."),
    new Question("Anh/chị có không thể đi làm vì phải chăm sóc người thân bị nhiễm Covid-19?", ["Đúng", "Không"], "Đúng", "Đủ tiêu chuẩn", "Bạn có thể đủ điều kiện để thất nghiệp theo đạo luật cứu trợ coronavirus quốc gia. Bạn nên đăng ký bảo hiểm thất nghiệp."),
];

var baseViet = [
    new Question("Bạn đã bị sa thải khỏi công việc của bạn hoặc bạn đã bỏ công việc của bạn?", ["Đúng", "Không"], "Đúng", "Không chất lượng", "Bạn sẽ cần được xem xét bởi một giám khảo yêu cầu thông qua một cuộc phỏng vấn tìm hiểu thực tế. Chủ lao động của bạn cũng có thể được liên lạc và người kiểm tra sẽ xác định tư cách của bạn."),
    new Question("Bạn đang tích cực tìm kiếm việc làm và bạn có sẵn sàng cho công việc?", ["Đúng", "Không"], "Đúng", "Không chất lượng", "Bạn phải tìm kiếm việc làm để đủ điều kiện nhận trợ cấp thất nghiệp."),
    new Question("Trong vòng 4 của 5 quí vừa qua, anh/chị có kiếm được nhiều hơn $10,000 đôla không?", ["Đúng", "Không"], "Không", "Không chất lượng", "Nếu bạn không đáp ứng yêu cầu thu nhập tối thiểu, bạn không đủ điều kiện nhận trợ cấp thất nghiệp."),
    ];

/*
/
/ English questions
/
*/

var covid19 = [
    new Question("Were you laid off due to COVID-19?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the Coronavirus Aid, Relief and Economic Security (CARES) Act, which provides an extra 13 weeks of benefits beyond regular unemployment benefits. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a>] and apply for additional benefits."),
    new Question("Did you stop working to quarantine and expect to work after quarantine is over?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the Coronavirus Aid, Relief and Economic Security (CARES) Act, which provides an extra 13 weeks of benefits beyond regular unemployment benefits. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a> and apply for additional benefits]."),
    new Question("Did you stop working due to risk of exposure or to care for a family member?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the Coronavirus Aid, Relief and Economic Security (CARES) Act, which provides an extra 13 weeks of benefits beyond regular unemployment benefits. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a>] and apply for additional benefits."),
    new Question("Did the breadwinner in your household die from COVID-19?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the Coronavirus Aid, Relief and Economic Security (CARES) Act, which provides an extra 13 weeks of benefits beyond regular unemployment benefits. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a>] and apply for additional benefits."),
    new Question("If you are self-employed, have you experienced loss of business due to COVID-19?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the Coronavirus Aid, Relief and Economic Security (CARES) Act, which provides an extra 13 weeks of benefits beyond regular unemployment benefits and extends benefits to self-employed, freelancers, and independent contractors. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a>] and apply for additional benefits.")
];

var base = [
    new Question("Did you involuntarily lose your job, not due to quitting or firing?", ["Yes", "No"], "No", "Not Qualified", "You will need to be reviewed by a claims examiner through a fact-finding interview. Your employer may also be contacted and the examineer will determine your eligibility."),
    new Question("Are you actively seeking employment and are you available for work?", ["Yes", "No"], "No", "Not Qualified", "You must be seeking employment in order to qualify for unemployment benefits."),
    // new Question("Are you a teacher or school employee?", ["Yes", "No"], "Yes", "Maybe Qualified", "If you have a claimed filed curing a recess period, only school wages in the base period of the claim, or an offer to return to work for a school employer when the recess period ends, you may not be eligibile, although eligibility depends on your unique situation."),
    // new Question("Are you a corporate officer or business owner?", ["Yes", "No"], "Yes", "Maybe Qualified", "If you own more than a 5 percent equitable (you own more than 5% of the capital stock of the corporation, either by yourself or with your spouse) or debt interest and your claim is based on wages with the corproation, you will not be considered unemployed during your term of office or ownership."),
    // new Question("Are you self-employed, a part-time worker, or an independent contractor?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the national coronavirus releif act. You should apply for unemployment insurance."),
];

/*
/
/ German questions
/
*/

var covid19Germ = [
    new Question("Haben Ihr Arbeitgeber wegen der COVID-19-Pandemie seinen Betrieb aufgehört?", ["Ja", "Nein"], "Ja", "Berechtigt", "Sie sind zum Erhalten der Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat berechtigt. Bitte bei Ihrem dortigen Arbeitsamt (Department of Labor) darum bewerben."),
    new Question("Ist Ihre Haushaltsernährer in wegen COVID-19 gestorben?", ["Ja", "Nein"], "Ja", "Berechtigt", "Sie sind zum Erhalten der Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat berechtigt. Bitte bei Ihrem dortigen Arbeitsamt (Department of Labor) darum bewerben."),
    new Question("Hörten Sie das Arbeiten wegen des Risikos der Kontakt mit Krankheitserregern, oder um Sich um einen Familienmitglied zu kümmern, auf?", ["Ja", "Nein"], "Ja", "Sie sind zum Erhalten der Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat berechtigt. Bitte bei Ihrem dortigen Arbeitsamt (Department of Labor) darum bewerben."),
    new Question("Haben Sie das Arbeiten wegen Quarantäne aufgehört, und vorhaben Sie am Ende der Quarantäne, wieder zu arbeiten?", ["Ja", "Nein"], "Ja", "Berechtigt", "Sie sind zum Erhalten der Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat berechtigt. Bitte bei Ihrem dortigen Arbeitsamt (Department of Labor) darum bewerben."),
];
  
  var baseGerm = [
    new Question("Haben Sie Ihre Arbeit unwillkürlich verloren, und nicht weil willkürliches Selbstaufhörens oder Entlassens?", ["Ja", "Nein"], "Nein", "Nicht berechtigt", ""),
    new Question("Suchen Sie aktiv eine Anstellung, und sind Sie auch bereit zum Arbeiten?", ["Ja", "Nein"], "Nein", "Leider sind Sie nicht berechtigt, Sozialhilfe für Arbeitslosigkeit in Ihrem Bundesstaat zu erhalten."),
];

/*
/
/ Korean questions
/
*/
  
var covid19Kore = [
    new Question("COVID-19 으로 인한 피해에 대해 복지를 원하십니까?", ["예", "아니요"], "예", "조건충족", "귀하는 현제 거주하시는 주에서 실업수당을 받을수 있습니다. 귀하의 주 노동부에 지원하십시오."),
    new Question("고용주가 COVID-19 때문에 사업을 중단했나요?", ["예", "아니요"], "예", "조건충족", "귀하는 현제 거주하시는 주에서 실업수당을 받을수 있습니다. 귀하의 주 노동부에 지원하십시오."),
    new Question("자가격리를 하기위해 현재 직장을 쉬고 있지만, 격리 기간 후 복귀하실 예정인가요?", ["예", "아니요"], "예", "조건충족", "귀하는 현제 거주하시는 주에서 실업수당을 받을수 있습니다. 귀하의 주 노동부에 지원하십시오."),
    new Question("유행병 전염 위험때문에, 혹은 아픈 가족을 볼보기 위해 직장을 쉬고 계신가요?",  ["예", "아니요"], "예", "조건충족", "귀하는 현제 거주하시는 주에서 실업수당을 받을수 있습니다. 귀하의 주 노동부에 지원하십시오."),
];
  
var baseKore = [
    new Question("정리해고나 퇴사때문이 아닌 실직을 당하셨습니까?", ["예", "아니요"], "아니요", "조건불충족", "사실 조사 인터뷰를 통해 클레임 심사관의 검토를 받아야합니다. 고용주에게 연락하여 검사관이 자격을 결정합니다."),
    new Question("귀하는 현재 취직활동을 하고있고, 일을 할수 있습니까?", ["예", "아니요"], "아니요", "조건불충족", "유감스럽게도 귀하는 실업 수당을 받을 수 있는 조건 불충족 입니다"),
];

/*
/
/ Punjabi
/
*/
var covid19Punj = [
    // new Question("Were you laid off due to COVID-19?", ["Yes", "No"], "Yes", "Qualified", "You may qualify for unemployment under the national coronavirus relief act. You should check your status for your [<a href=\"https://www.irs.gov/newsroom/economic-impact-payments-what-you-need-to-know\">stimulus package</a>]."),
    new Question("ਕੀ ਤੁਸੀਂ ਕੰਮ ਕਰਨਾ ਬੰਦ ਕਰ ਦਿੱਤਾ ਹੈ ਕੁਆਰੰਟੀਨ ਕਰਨ ਲਈ? ਕੀ ਤੁਸੀਂ ਕੁਆਰੰਟੀਨ ਤੋਂ ਬਾਅਦ ਕੰਮ ਕਰਨ ਦੀ ਉਮੀਦ ਕਰਦੇ ਹੋ?", ["ਜੀ", "ਨਹੀਂ"], "ਜੀ", "ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋਗੇ", "ਤੁਸੀਂ ਰਾਸ਼ਟਰੀ ਕੋਰੋਨਾਵਾਇਰਸ ਰਾਹਤ ਐਕਟ ਅਧੀਨ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਲਈ ਯੋਗ ਹੋ ਸਕਦੇ ਹੋ. ਤੁਹਾਨੂੰ ਆਪਣੇ ਸਟਿਮਯੁਲਸ ਪੈਕੇਜ ਲਈ ਆਪਣੇ ਸਟੈਟਸ ਦੀ ਜਾਂਚ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ."),
    new Question("ਕੀ ਤੁਸੀਂ ਕੋਰੋਨਾਵਾਈਰਸ ਦੇ ਖਤਰੇ ਕਾਰਨ ਜਾਂ ਕਿਸੇ ਪਰਿਵਾਰਕ ਮੈਂਬਰ ਦੀ ਦੇਖਭਾਲ ਲਈ ਕੰਮ ਕਰਨਾ ਬੰਦ ਕਰ ਦਿੱਤਾ ਹੈ?", ["ਜੀ", "ਨਹੀਂ"], "ਜੀ", "ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋਗੇ", "ਤੁਸੀਂ ਰਾਸ਼ਟਰੀ ਕੋਰੋਨਾਵਾਇਰਸ ਰਾਹਤ ਐਕਟ ਅਧੀਨ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਲਈ ਯੋਗ ਹੋ ਸਕਦੇ ਹੋ. ਤੁਹਾਨੂੰ ਆਪਣੇ ਸਟਿਮਯੁਲਸ ਪੈਕੇਜ ਲਈ ਆਪਣੇ ਸਟੈਟਸ ਦੀ ਜਾਂਚ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ."),
    new Question("ਕੀ ਤੁਹਾਡੇ ਘਰ ਵਿਚ ਪੈਸਾ ਕਮਾਉਣ ਵਾਲੇ ਵਿਅਕਤੀ ਦੀ ਮੌਤ ਹੋ ਗਈ?", ["ਜੀ", "ਨਹੀਂ"], "ਜੀ", "ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋਗੇ", "ਤੁਸੀਂ ਰਾਸ਼ਟਰੀ ਕੋਰੋਨਾਵਾਇਰਸ ਰਾਹਤ ਐਕਟ ਅਧੀਨ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਲਈ ਯੋਗ ਹੋ ਸਕਦੇ ਹੋ. ਤੁਹਾਨੂੰ ਆਪਣੇ ਸਟਿਮਯੁਲਸ ਪੈਕੇਜ ਲਈ ਆਪਣੇ ਸਟੈਟਸ ਦੀ ਜਾਂਚ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ."),
];

var basePunj = [
    new Question("ਕੀ ਤੁਹਾਡਾ ਕੰਮ ਛੁਟ ਗਿਆ ਹੈ ਤੁਹਾਡੀ ਮਰਜ਼ੀ ਤੋਂ ਬਿਨਾ?", ["ਜੀ", "ਨਹੀਂ"], "ਨਹੀਂ", "ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰੋਗੇ", "You will need to be reviewed by a claims examiner through a fact-finding interview. Your employer may also be contacted and the examineer will determine your eligibility."),
    new Question("ਕੀ ਤੁਸੀਂ ਕੰਮ ਦੀ ਭਾਲ ਕਰ ਰਹੇ ਹੋ ਅਤੇ ਕੀ ਤੁਸੀਂ ਕੰਮ ਲਈ ਅਵੈਲੇਬਲ ਹੋ, ਕੰਮ ਕਰ ਸਕਦੇ ਹੋ?", ["ਜੀ", "ਨਹੀਂ"], "ਨਹੀਂ", "ਤੁਸੀਂ ਸਰਕਾਰ ਤੋਂ ਬੇਰੁਜ਼ਗਾਰੀ ਦੇ ਲਾਭ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰੋਗੇ", "You must be seeking employment in order to qualify for unemployment benefits."),
];

var al = $.extend( {}, base );
var ak = $.extend( {}, base );
var az = $.extend( {}, base );
var ar = $.extend( {}, base );
var ca = $.extend( {}, base );
var co = $.extend( {}, base );
var ct = $.extend( {}, base );
var de = $.extend( {}, base );
var dc = $.extend( {}, base );
var fl = $.extend( {}, base );
var ga = $.extend( {}, base );
var hi = $.extend( {}, base );
var id = $.extend( {}, base );
var il = $.extend( {}, base );
var ind = $.extend( {}, base );
var ia = $.extend( {}, base );
var ks = $.extend( {}, base );
var ky = $.extend( {}, base );
var la = $.extend( {}, base );
var me = $.extend( {}, base );
var md = $.extend( {}, base );
var ma = $.extend( {}, base );
var mi = $.extend( {}, base );
var mn = $.extend( {}, base );
var ms = $.extend( {}, base );
var mo = $.extend( {}, base );
var mt = $.extend( {}, base );
var ne = $.extend( {}, base );
var nv = $.extend( {}, base );
var nh = $.extend( {}, base );
var nm = $.extend( {}, base );
var nj = $.extend( {}, base );
var ny = $.extend( {}, base );
var nc = $.extend( {}, base );
var nd = $.extend( {}, base );
var oh = $.extend( {}, base );
var ok = $.extend( {}, base );
var or = $.extend( {}, base );
var pa = $.extend( {}, base );
var ri = $.extend( {}, base );
var sc = $.extend( {}, base );
var sd = $.extend( {}, base );
var tn = $.extend( {}, base );
var tx = $.extend( {}, base );
var ut = $.extend( {}, base );
var vt = $.extend( {}, base );
var va = $.extend( {}, base );
var wa = $.extend( {}, base );
var wv = $.extend( {}, base );
var wi = $.extend( {}, base );
var wy = $.extend( {}, base );

al[2] = new Question("Do you meet the minimum earnings requirement of having worked in at least two quarters of the last base period, having earned at least 1.5x your earnings in the highest paid quarter of the period, and having an average quarterly earning during the two highest paid quarters of at least $1157.01? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ak[2] = new Question("Do you meet the minimum earnings requirement of having earned wages at least $2,500 in two quarters of the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
az[2] = new Question("Do you meet the minimum earnings requirement of having earned $4,680 a quarter with at least $7,020 over the entire year? The total of the other three quarters must equal at least one half of the amount in your high quarter. Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ar[2] = new Question("Do you meet the minimum earnings requirement of having earned wages in at least two quarters of the base period, making at least 35x your weekly benefit amount during the entire base period? To qualify you must make equal to or greater than $2,835.00. Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ca[2] = new Question("Do you meet the minimum earnings requirement of having earned at least $1,300 in your highest paid quarter of the base period with at least $900 in your highest paid quarter of the base period and at least 1.25x your earnings in the highest paid quarter during the entire base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
co[2] = new Question("Do you meet the minimum earnings requirement of having earned at least $2,500 in the last base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ct[2] = new Question("Do you meet the minimum earnings requirement of having earned at least 40 times the weekly benefit rate? (Weekly benefit amount is the average of your wages from the two highest quarters in your base period divded by 26, up to $698.) Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
de[2] = new Question("Do you meet the minimum earnings requirement of having earned at least $720 in the last base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
dc[2] = new Question("Do you meet the minimum earnings requirement of having earned at least $1,300 in your highest paid quarter of the base period, at least $1,950 during the entire base period, and earned wages in at least two quarters of the base period? Your earnings during the entire base period must be at least 1.5 times your earnings in the highest paid quarter of the base period, or within $70 of that amount. Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
fl[2] = new Question("Did you earn wages in at least two quarters, with the total wages at least 1.5x the highest quarter and at least $3400 during the entire base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ga[2] = new Question("Did you earn wages in at least two quarters of the base period with at least $1134 during the two highest quarters and total wages of at least 1.5x the highest quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
hi[2] = new Question("Did you earn wages in at least two quarters of the base period with at least $3380 for the entire base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
id[2] = new Question("Did you earn at wages in at least two quarters, with a total of at least 1.25x the highest paid quarter, and a highest-paid quarter of at least $1872? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
il[2] = new Question("Did you earn at least $1600 in total and at least $440 outside your highest paid quarter during the last base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ind[2] = new Question("Did you earn at least $4200 in the base period and at least $2500 in the last six months, with at least 1.5x your highest quarter in total? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ia[2] = new Question("Did you earn wages in at least two quarters of the base period, with at least 1.25x your highest quarter in total? Your highest quarter must be at least $1430 and your lowest quarter at least $720. Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ks[2] = new Question("Did you earn wages in at least two quarters of the base period, with at least $3660 in total? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ky[2] = new Question("Did you earn at least $750 in one quarter outside of your highest paid quarter and at least 1.5x your highest quarter in total during the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
la[2] = new Question("Did you earn at least $1200 during the base period, with a total of at least 1.5x your highest quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
me[2] = new Question("Did you earn at least $1608 during the last two weeks of the base period and $4826 during the entire period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
md[2] = new Question("Did you earn at least $1176 in your highest paid quarter, earning at least 1.5x your highest quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ma[2] = new Question("Did you earn at least $3500 during the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
mi[2] = new Question("Did you earn wages in at least two quarters and earn at least $3589 in one quarter, with earnings at least 1.5x your highest quarter? Otherwise, did you earn at least $20,742 in your base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
mn[2] = new Question("Did you earn at least $3700 in the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ms[2] = new Question("Did you earn at least $780 in the highest quarter, working at least two quarters? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
mo[2] = new Question("Did you make at least $2250 in the base period with at least $1500 in one quarter and $750 in another? Also were your wages at least 1.5x your highest quarter or did you earn at least $19,500 in two of the quarters? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
mt[2] = new Question("Did you make at least 1.5x your wage in the highest paid quarter or have total wages of at least 50% the state's average annual wage? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ne[2] = new Question("Did you make at least $4246 during the base period, with at least $1850 in one quarter and $800 in another? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nv[2] = new Question("Did you make at least $400 in your highest paid quarter of the base period with total earnings at least 1.5x your earnings in the highest quarter or earning wages in at least three of the quarters? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nh[2] = new Question("Did you earn at least $2800 in the base period and at least $1400 in each of two quarters? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nm[2] = new Question("Did you make at least $2089 during the base period, earning wages in at least two quarters? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nj[2] = new Question("Do you meet the minimum earnings requirement of $10k during (a) your regular base year period (first four of the last five completed calendar quarters) or $200/week for 20 weeks, (b) the four most recently completed calendar quarters preceding the date of the claim, or (c) the three most recently completed calendar quarters preceding the date of claim, and weeks and wages in the filing quarter up to your last day of work?", ["Yes", "No"], "No", "Not Qualified", "If you don't meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ny[2] = new Question("Did you earn wages in at leaset two quarters with at least $2600 in one quarter, making over 1.5x the wage of your highest quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nc[2] = new Question("Did you earn wages in at least two quarters and earn at least $780 in one of the last two quarters of the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
nd[2] = new Question("Did you earn wages in at least two quarters and 1.5x your wages in the highest paid quarter of the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
oh[2] = new Question("Did you work at least 20 weeks and earn an average of $269/week during the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ok[2] = new Question("Did you earn at least $1500 during the base period, earning at least 1.5x your earnings in the highest paid quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
or[2] = new Question("Did you earn at least $1000 during the base period or worked at least 500 hours? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
pa[2] = new Question("Did you earn at least $116/week in the last 18 weeks of the base period, at least $1688 in the highest quarter, and at least $3391 in total? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ri[2] = new Question("Did you earn at least $4040 during the base period and $2020 in the highest paid quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
sc[2] = new Question("Did you earn at least $1092 during the highest quarter with at least $4455 in the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
sd[2] = new Question("Did you earn at least $728 in the highest quarter and earn wages for two quarters of the base periood? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
tn[2] = new Question("Did you earn at least $780 in your two highest-paid quarters and at least $900 in the other quarters of your base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
tx[2] = new Question("Did you earn wages in at least two quarters of the base period, making at least 37x the weekly benefit amount? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
ut[2] = new Question("Did you earn at least $3600 during the base period and at least 1.5x your earnings in the highest paid quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
vt[2] = new Question("Did you earn at least $2386 in the highest paid quarter of the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
va[2] = new Question("Did you earn at least $3000 in two quarters of the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
wa[2] = new Question("Did you work at least 680 hours during the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
wv[2] = new Question("Were you paid wages in at least two quarters and paid at least $2200 in the entire base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
wi[2] = new Question("Did you earn wages in at least two quarters in the base period? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")
wy[2] = new Question("Did you earn at least 8% of the state's average annual wage during the base period and at least 1.4x your earnings in the highest paid quarter? Your base period is defined as the earliest four of the five complete calendar quarters before you filed your benefits claim.", ["Yes", "No"], "No", "Not Qualified", "If you do not meet the minimum earnings requirement, you do not qualify for unemployment benefits.")

getStarted();
