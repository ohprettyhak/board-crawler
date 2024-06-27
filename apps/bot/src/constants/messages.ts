export const Messages = {
  SUBSCRIPTION_REMOVED: "구독이 취소되었습니다.",

  UNSUBSCRIBE_PROMPT: "구독 해지할 게시판을 선택하세요:",
  SELECTED_OPTION: (option: string) => `선택한 옵션: ${option}`,
  BACK_OPTION: "뒤로가기",
};

export const PROMPT = {
  START: `안녕하세요! 저는 퐁퐁이에요. 게시판 구독을 도와드릴게요.\n
저에게 아래 명령어를 보내서 다양한 기능을 사용해보세요!\n
구독 관리:\n/subscribe - 새로운 구독 추가\n/unsubscribe - 기존 구독 해지\n/current - 현재 구독 상태 보기\n
무엇을 도와드릴까요?`,

  SUBSCRIBE: "어떤 조직을 구독하시겠어요?",

  BOARD_SELECTION: "어떤 게시판을 구독할까요?",
  SUBSCRIPTION_ADDED: "구독이 추가되었습니다.",
  ALREADY_SUBSCRIBED: "이미 구독 중입니다.",

  CURRENT_SUBSCRIPTIONS: "현재 구독 중인 게시판 목록:\n",
  NO_SUBSCRIPTIONS: "현재 구독 중인 게시판이 없습니다.",

  UNSUBSCRIBED: "구독이 해지되었습니다.",
};
