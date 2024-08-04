export const PROMPT = {
  START: `안녕하세요! 저는 퐁퐁이에요. 게시판 구독을 도와드릴게요.\n
아래 명령어를 보내서 다양한 기능을 사용해 보세요!\n
구독 관리:\n/subscribe - 새로운 구독 추가\n/unsubscribe - 기존 구독 해지\n/current - 현재 구독 상태 보기\n
무엇을 도와드릴까요?`,

  SUBSCRIBE: '어떤 조직을 구독하시겠어요?',

  BOARD_SELECTION: '어떤 게시판을 구독하시겠어요?',
  SUBSCRIPTION_ADDED: '{board} 게시판을 구독했어요!',
  ALREADY_SUBSCRIBED: '{board} 게시판은 이미 구독중이에요.',

  CURRENT_SUBSCRIPTIONS: '현재 구독 중인 게시판 목록:\n{boards}',
  NO_SUBSCRIPTIONS: '현재 구독 중인 게시판이 없어요.',

  BOARD_UNSUBSCRIBE_SELECTION: '어떤 게시판을 구독 해지하시겠어요?',
  UNSUBSCRIBED: '{board} 게시판을 구독 해지했어요!',
};

export const COMMANDS = [
  {
    command: 'help',
    description: '도움말',
  },
  {
    command: 'subscribe',
    description: '새로운 구독 추가',
  },
  {
    command: 'unsubscribe',
    description: '기존 구독 해지',
  },
  {
    command: 'current',
    description: '현재 구독 상태 보기',
  },
];
