# 배달앱 만들어보기!

Express node.js 웹 애플리케이션 프레임워크와 Sequelize를 활용하여 구현

Layered Architecture Pattern으로 작성.(Controller, Service, Repository)

Nunjucks 템플릿 엔진을 활용하여 프론트엔드 구현

-ERD
![drawSQL--export-2023-07-24](https://github.com/othwan410/deliveryWeb/assets/76437904/c8c8407c-f00a-40ec-a4c8-bb4334f85952)

기능:

1. 키워드 검색.
2. 찜하기
3. 주소 여러개 추가 가능, 주소 관련 기능 구현
4. 주문하기
5. 사장님 주문 상태 변경 가능(주문취소, 조리중, 배달중, 배달완료)
6. 주문 목록 확인 가능(유저일 경우 유저의 주문목록, 사장님의 경우 해당 가게의 주문 목록)
7. 리뷰 기능
8. 유저 계정별 권한 설정
