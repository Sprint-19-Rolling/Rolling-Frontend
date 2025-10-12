import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropbox/Dropdown';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import TextEditor from '@/components/common/TextEditor';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import useError from '@/hooks/useError';
import { useInput } from '@/hooks/useInput';
import { useMessageSubmit } from '@/hooks/useMessageSubmit';

// useDataFetch 훅 (내부 정의)
const useDataFetch = (fetcher, deps = []) => {
  const { setError } = useError();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setData(null);
    setError(null);
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await fetcher(controller.signal);
        setData(result);
      } catch (err) {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          return;
        }

        setError({
          status: err.response?.status || 500,
          message:
            err.response?.data?.message || '데이터를 불러오는 데 실패했습니다.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, setData, loading };
};

// 글꼴 리스트 상수 (표시용)
const FONT_OPTIONS = [
  'Noto Sans',
  'Pretendard',
  '나눔 명조',
  '나눔손글씨 손편지체',
];

// 글꼴 매핑 (한글 → 영문 하이픈 형식)
const FONT_MAP = {
  'Noto Sans': 'noto-sans',
  Pretendard: 'pretendard',
  '나눔 명조': 'nanum-myeongjo',
  '나눔손글씨 손편지체': 'handletter',
};

const PostMessage = () => {
  const { id } = useParams();
  const recipient_id = id;

  const fromInput = useInput({
    label: '보내는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  // API 호출 함수
  const fetchProfileImages = async (signal) => {
    const response = await axios.get(
      'https://rolling-api.vercel.app/profile-images/',
      { signal }
    );
    return response.data.imageUrls; // imageUrls 배열 반환
  };

  const { data: profileImages, loading } = useDataFetch(fetchProfileImages, []);

  // 선택된 프로필 이미지 URL 상태
  const [profileImageURL, setProfileImageURL] = useState('');

  // profileImages가 바뀌면 기본 선택 이미지 설정
  useEffect(() => {
    if (
      Array.isArray(profileImages) &&
      profileImages.length > 0 &&
      !profileImageURL
    ) {
      setProfileImageURL(profileImages[0]);
    }
  }, [profileImages, profileImageURL]);

  const {
    handleSubmit: submitMessage,
    isSubmitting,
    error,
    setError,
  } = useMessageSubmit(recipient_id);

  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('Noto Sans'); // 서버 저장용 (원본 이름)
  const [editorFont, setEditorFont] = useState('noto-sans'); // 에디터 표시용 (하이픈 형식)

  const [formError, setFormError] = useState('');

  const isContentEmpty =
    !content || content.replace(/<[^>]*>/g, '').trim() === '';

  const handleSubmit = async () => {
    console.log('제출 시 font 값:', font); // 디버깅용
    setFormError('');
    setError('');

    if (!fromInput.validate()) {
      return;
    }
    if (isContentEmpty) {
      setFormError('내용을 입력해주세요.');
      return;
    }

    await submitMessage({
      sender: fromInput.value,
      profileImageURL,
      relationship,
      content,
      font, // 'Noto Sans', 'Pretendard' 등 원본 이름으로 저장
    });
  };

  const isButtonDisabled =
    isSubmitting ||
    !fromInput.value.trim() ||
    !profileImageURL ||
    !relationship ||
    isContentEmpty;

  // 외부 드롭다운에서 글꼴 선택 시 처리
  const handleFontChange = (newFont) => {
    console.log('선택된 폰트:', newFont); // 디버깅용
    setFont(newFont); // 원본 이름 저장 (예: 'Noto Sans', 'Pretendard')

    // 에디터용 하이픈 형식으로 변환
    const formattedFont =
      FONT_MAP[newFont] || newFont.replace(/\s+/g, '-').toLowerCase();
    setEditorFont(formattedFont);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 py-10 sm:px-6">
      <section className="flex w-full max-w-[720px] flex-col gap-10 sm:max-w-[640px] md:max-w-[720px]">
        {/* From 입력 */}
        <div className="w-full">
          <Title>From.</Title>
          <TextInput
            name="From"
            placeholder="이름을 입력해 주세요"
            {...fromInput}
            className="w-full"
          />
        </div>

        {/* 프로필 이미지 선택 */}
        <div>
          <Title>프로필 이미지</Title>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:gap-4">
            <div className="flex flex-shrink-0 justify-center sm:justify-start">
              <ProfileImage
                src={
                  profileImageURL ||
                  'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png'
                }
                size="xlarge"
                borderColor="gray"
                isSelected={false}
                isClickable={false}
                className="mt-[7px]"
              />
            </div>

            <div className="mt-4 flex-grow sm:ml-[12px] sm:mt-0">
              <p className="mb-3 text-center text-base font-medium text-gray-600 sm:text-left">
                프로필 이미지를 선택해주세요!
              </p>
              <div className="flex flex-wrap justify-center gap-[5px] sm:justify-start">
                {loading ? (
                  <p className="text-sm text-gray-400">
                    프로필 이미지를 불러오는 중...
                  </p>
                ) : Array.isArray(profileImages) && profileImages.length > 0 ? (
                  profileImages.map((url) => {
                    return (
                      <ProfileImage
                        key={url}
                        src={url}
                        size="medium"
                        isSelected={profileImageURL === url}
                        isClickable={true}
                        onClick={() => setProfileImageURL(url)}
                      />
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">
                    사용할 수 있는 이미지가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 관계 선택 */}
        <div>
          <Title>상대와의 관계</Title>
          <Dropdown
            items={['친구', '지인', '동료', '가족']}
            placeholder="지인"
            onChange={setRelationship}
            className="w-full"
          />
        </div>

        {/* 내용 입력 */}
        <div className="w-full">
          <Title>내용을 입력해 주세요</Title>
          <TextEditor
            value={content}
            onChange={setContent}
            font={editorFont}
            onFontChange={handleFontChange}
            className="w-full"
          />
        </div>

        {/* 폰트 선택 */}
        <div className="w-full max-w-[320px]">
          <Title>폰트 선택</Title>
          <Dropdown
            items={FONT_OPTIONS}
            placeholder="폰트를 선택하세요"
            onChange={handleFontChange}
            className="w-full"
          />
        </div>

        {/* 에러 메시지 */}
        {formError && (
          <p className="text-center text-sm text-red-500">{formError}</p>
        )}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="flex h-[56px] w-[720px] cursor-pointer items-center justify-center gap-1 rounded-md border-0 border-gray-300 bg-purple-600 px-4 text-center font-[Pretendard] text-[18px] font-bold leading-[28px] tracking-[-0.18px] text-white hover:bg-purple-700 focus-visible:bg-purple-800 focus-visible:outline-2 focus-visible:outline-purple-900 active:bg-purple-800 disabled:cursor-default disabled:border-0 disabled:bg-gray-300 disabled:text-white">
            {isSubmitting ? '생성 중...' : '생성하기'}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PostMessage;
