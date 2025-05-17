# Gateway 서비스 (NestJS Microservice Gateway)

이 디렉토리는 이벤트/보상 관리 시스템의 API Gateway입니다.
HTTP 요청을 받아 각 마이크로서비스(Auth, Event 등)와 NestJS Microservices (TCP) 방식으로 통신합니다.

#### 주요 기능

    •	HTTP API 진입점 제공 (/auth/*, /event/* 등)
    •	요청을 내부 마이크로서비스로 TCP를 통해 전달
    •	JWT 기반 인증, 역할 기반 인가 로직
    •	내부 마이크로서비스의 클라이언트 역할
