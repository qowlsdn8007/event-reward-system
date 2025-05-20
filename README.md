# Event Reward System

이 프로젝트는 이벤트/보상 관리 플랫폼으로, NestJS 기반의 MSA 구조로 구성되어 있으며, 유저의 행동에 기반한 조건 검증을 통해 이벤트 보상 지급을 처리합니다. DDD 아키텍쳐를 기반으로 도메인에 따른 각 계층이 분리되고, 느슨하게 결합될 수 있는 것에 초점을 두고 구현했습니다.

---

## 고민점

마이크로서비스 관점과, 이를 모노레포로 관리하는 부분을 중점적으로 고민했습니다.
domain을 잘 정의하고, 이를 사용하는 layer를 나누어 서로 느슨하게 결합할 수 있도록 하였습니다.

- repository는 mongodb와 관계 없이 interface를 사용, 추후 redis 등 사용을 고려,
- presentation layer의 통신 방식이 변경되더라도 해당 레이어만 수정하면 되도록 함
  - 현재는 tcp message pattern 을 사용하지만 grpc를 사용한다면 이 layer만 수정하면됨
- pnpm monorepo 사용으로 공통된 설정파일들 관리
  - presentation에서 사용하는 공통된 dto를 패키지화해서 사용 계획 (현재는 적용되지 않음)

## 실행 방법

```
$root

docker-compose up --build -d
```

로컬 docker 실행 시 현재 env에 셋팅되어있는 호스트, 포트는 아래와 같습니다.

- gateway server: localhost:3000
- auth server: localhost:3001
- event server: localhost:3002

---

## 📌 Gateway API 엔드포인트 요약

### 🔐 `/auth` 인증 관련

| 메서드 | 경로             | 설명           | 권한  |
| ------ | ---------------- | -------------- | ----- |
| POST   | `/auth/register` | 유저 등록      | ADMIN |
| POST   | `/auth/login`    | 로그인         | 전체  |
| PUT    | `/auth/role`     | 유저 역할 변경 | ADMIN |

### 🎁 `/event` 이벤트 관련

| 메서드 | 경로         | 설명                  | 권한            |
| ------ | ------------ | --------------------- | --------------- |
| POST   | `/event`     | 이벤트 생성           | ADMIN, OPERATOR |
| GET    | `/event`     | 전체 이벤트 목록 조회 | 전체            |
| GET    | `/event/:id` | 단일 이벤트 상세 조회 | 전체            |

### 🎁 `/event/reward` 보상 관련

| 메서드 | 경로                     | 설명                | 권한            |
| ------ | ------------------------ | ------------------- | --------------- |
| POST   | `/event/reward`          | 보상 등록           | ADMIN, OPERATOR |
| GET    | `/event/reward`          | 전체 보상 목록 조회 | 전체            |
| GET    | `/event/reward/:eventId` | 이벤트별 보상 조회  | 전체            |

### 🙋 `/event/claim` 보상 요청 관련

| 메서드 | 경로                   | 설명                            | 권한                     |
| ------ | ---------------------- | ------------------------------- | ------------------------ |
| POST   | `/event/claim`         | 유저가 보상 요청                | 전체                     |
| GET    | `/event/claim/me`      | 본인 보상 요청 이력 조회        | 전체                     |
| GET    | `/event/claim/:userId` | 특정 유저의 보상 요청 이력 조회 | ADMIN, OPERATOR, AUDITOR |
| GET    | `/event/claim`         | 전체 보상 요청 이력 조회        | ADMIN, OPERATOR, AUDITOR |

---

## 서비스 구성

### [Gateway Server](https://github.com/qowlsdn8007/event-reward-system/tree/main/apps/gateway)

### [Auth Server](https://github.com/qowlsdn8007/event-reward-system/blob/main/apps/auth/README.md)

### [Event Server](https://github.com/qowlsdn8007/event-reward-system/blob/main/apps/event/README.md)

## 요구 사항을 위한 추가 구현

### 행동 로그

- 유저 행동 (`LOGIN`, `INVITE` 등)을 기록
- 이벤트 조건 평가 시 활용

### 조건 검증

- `LOGIN_CONSECUTIVE_DAYS` 등 조건 유형에 따라 전략적으로 검증
- 향후 다양한 조건 타입 확장 가능

---

## DDD 기반 구조 예시

```
apps/event/src/
├── domain/                   # Entity, Interface 정의
│   ├── event.ts
│   ├── reward.ts
│   ├── claim.ts
│   ├── user-behavior-log.ts
│   └── *.repository.interface.ts
├── application/             # 유스케이스 로직 (서비스)
│   ├── event.service.ts
│   ├── reward.service.ts
│   ├── claim.service.ts
│   └── condition-checker.service.ts
├── infra/                   # MongoRepository 등 구현체
│   ├── event.repository.mongodb.ts
│   └── ...
├── presentation/            # @MessagePattern 핸들러들
│   ├── event.controller.ts
│   ├── reward.controller.ts
│   └── claim.controller.ts
```
