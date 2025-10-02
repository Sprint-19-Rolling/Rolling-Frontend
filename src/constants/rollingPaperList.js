/**
 * 초기 로딩 시 MessageList에 표시할 그리드 슬롯의 총 개수입니다.
 * (메시지 추가 버튼 슬롯 1개 + 초기 데이터 메시지 슬롯 8개 = 9)
 */
const MESSAGE_LIST_SKELETON_COUNT = 9;

export const MESSAGE_LIST_SKELETON_ARRAY = Array.from({
  length: MESSAGE_LIST_SKELETON_COUNT,
});

/**
 * 롤링페이퍼 메세지 limit → 최대 8개
 */
export const MESSAGES_LIMIT = 8;
