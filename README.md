# Event Reward System

이 프로젝트는 이벤트/보상 관리 플랫폼으로, NestJS 기반의 MSA 구조로 구성되어 있으며, 유저의 행동에 기반한 조건 검증을 통해 이벤트 보상 지급을 처리합니다. DDD 아키텍쳐를 기반으로 도메인에 따른 각 계층이 분리되고, 느슨하게 결합될 수 있는 것에 초점을 두고 구현했습니다.

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

실행 방법

```
$root

docker-compose up --build -d
```
