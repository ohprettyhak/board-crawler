"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMPT = exports.Message = void 0;
exports.Message = {
    ALREADY_SUBSCRIBED: "이미 구독 중입니다.",
    SUBSCRIPTION_REMOVED: "구독이 취소되었습니다.",
    NO_SUBSCRIPTIONS: "현재 구독 중인 게시판이 없습니다.",
    UNSUBSCRIBE_PROMPT: "구독 해지할 게시판을 선택하세요:",
    CURRENT_SUBSCRIPTIONS: "현재 구독 중인 게시판 목록:\n",
    SELECTED_OPTION: (option) => `선택한 옵션: ${option}`,
    BACK_OPTION: "뒤로가기",
};
exports.PROMPT = {
    WELCOME: `안녕하세요! 저는 퐁퐁이에요. 게시판 구독을 도와드릴게요.\n
저에게 아래 명령어를 보내서 다양한 기능을 사용해보세요!\n
구독 관리:\n/subscribe - 새로운 구독 추가\n/unsubscribe - 기존 구독 해지\n/current - 현재 구독 상태 보기\n
무엇을 도와드릴까요?`,
    SUBSCRIBE: "어떤 조직을 구독하시겠어요?",
    SUBSCRIPTION_ADDED: "구독이 추가되었습니다.",
    BOARD_SELECTION: "구독할 게시판을 선택하세요:",
};
//# sourceMappingURL=Message.js.map