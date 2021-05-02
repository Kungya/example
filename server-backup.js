const mysql2 = require("mysql2");

const path = require("path");
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const { signUp } = require("./register");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const http = require("http").Server(app);

// const connection = mysql2.createConnection({
//   host: "localhost",
//   user: "tester",
//   password: "tester7",
//   database: "main",
// });

app.use(express.static(path.join(__dirname, "main")));
app.use(express.static(path.join(__dirname, "image")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*
function restrict(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    req.session.error = 'You are not logged in';
    res.sendFile(path.join(__dirname + '/my/login.html'));
  }
}
*/
/*
app.use('/', function(request, response, next) {
	if ( request.session.loggedin == true || request.url == "/login" || request.url == "/register" ) {
    next();
	}
	else {
    response.sendFile(path.join(__dirname + '/my/login.html'));
	}
});
*/
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/index.html")); //check
});

app.get("/login", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});
/*
app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true; // loggedin == true -> 로그인상태
				request.session.username = username;
                response.redirect('/index.html');
                console.log('User with [', request.connection.remoteAddress, '] IP is logged in.')
				response.end(); // 로그인시 IP 로그 남기기
			} else {
				response.sendFile(path.join(__dirname + '/loginerror.html')); // 로그인에러 창으로 이동
			}			
		});
	} else {
		
		response.send('Please enter Username and Password!');
		response.end();
	}
});
*/
app.get("/test", function (req, res) {
  return res.status(200).json({ message: "test" });
});

app.post("/signup", function (req, res) {
  return signUp(req, res);
});

function CheckPasswordPattern(password) {
  var pattern1 = /[0-9]/;
  var pattern2 = /[a-zA-Z]/;

  if (!pattern1.test(password) || !pattern2.test(password) || password.length < 8) {
    response.send(" 비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다. ");
    return false;
  } else {
    return true;
  }
}

// app.post("/signup", function (request, response) {
//   var name = request.body.name; // 이름
//   var username = request.body.username; // ID
//   var password = request.body.password; // 비밀번호
//   var password2 = request.body.password2; //비밀번호 확인
//   var email = request.body.email; // 이메일
//   // 주소, 추가예정
//   console.log(name, username, password, email);
//   if (name && username && password && email) {
//     connection.query(
//       "SELECT * FROM user WHERE name = ? AND username = ? AND password = ? AND email = ?",
//       [name, username, password, email],
//       function (error, results, fields) {
//         if (error) throw error;
//         if (results.length <= 0) {
//           CheckPasswordPattern(password); // 비밀번호 생성 규칙 검사 함수
//           connection.query(
//             "INSERT INTO user (name, username, password, email) VALUES(?,?,?,?)",
//             [name, username, password, email],
//             function (error, data) {
//               if (error) console.log(error);
//               else console.log(data);
//             }
//           );
//           response.send(username + ' Registered Successfully!<br><a href="/index">Home</a>'); // 회원가입 성공시 로그인된채로 메인화면 가야함 (추가예정)
//         } else {
//           response.send(
//             username + ' 아이디는 이미 존재합니다 !<br><a href="/signup" target="_parent">Home</a>'
//           );
//         }
//         response.end();
//       }
//     );
//   } else {
//     response.send("Please enter User Information!");
//     response.end();
//   }
// });
/*
app.get('/logout', function(request, response) {
  request.session.loggedin = false;
	response.send('<center><H1>로그아웃 되었습니다 </H1><H1><a href="/index">메인으로 가기</a></H1></center>');
	response.end();
});
*/
/*
app.get('/home', restrict, function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/my/home.html'));
	} else {
		response.send('로그인을 해주세요 !');
		response.end();
	}
});*/

http.listen("3000", function () {
  console.log("Server Start : http://127.0.0.1:3000");
});
