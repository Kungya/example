const { response } = require('express')
const mysql = require('mysql')

const signUp = (resquest, response) => {
    const name = request.body.name; // 이름
	const username = request.body.username; // ID
	const password = request.body.password; // 비밀번호
	const password2 = request.body.password2; //비밀번호 확인
	const email = request.body.email; // 이메일
    
	// 주소, 추가예정
	console.log(name, username, password, email);
	if (name && username && password && email) {
		connection.query('SELECT * FROM user WHERE name = ? AND username = ? AND password = ? AND email = ?', [name, username, password, email], function(error, results, fields) {
			if (error) throw error;
			if (results.length <= 0) {
				CheckPasswordPattern(password); // 비밀번호 생성 규칙 검사 함수
        connection.query('INSERT INTO user (name, username, password, email) VALUES(?,?,?,?)', [name, username, password, email],
            function (error, data) {
                if (error)
                  console.log(error);
                else
                  console.log(data);
        });
			  response.send(username + ' Registered Successfully!<br><a href="/index">Home</a>'); // 회원가입 성공시 로그인된채로 메인화면 가야함 (추가예정)
			} else {
				response.send(username + ' 아이디는 이미 존재합니다 !<br><a href="/signup" target="_parent">Home</a>');
			}
			response.end();
		});
	} else {
		response.send('Please enter User Information!');
		response.end();
	}
    return response.end() 
}