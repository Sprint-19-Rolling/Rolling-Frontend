import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropbox/Dropdown';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import TextEditor from '@/components/common/TextEditor';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import { fontMap, fontDisplayNames } from '@/constants/fontMap';
import useDataFetch from '@/hooks/useDataFetch';
import { useInput } from '@/hooks/useInput';
import { useMessageSubmit } from '@/hooks/useMessageSubmit';

const PostMessage = () => {
  const { id } = useParams();
  const recipient_id = id;

  const fromInput = useInput({
    label: '보내는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  // 프로필 이미지 fetch 함수
  const fetchProfileImages = async (signal) => {
    const response = await axios.get(
      'https://rolling-api.vercel.app/profile-images/',
      { signal }
    );
    return response.data.imageUrls;
  };

  const { data: profileImages, loading } = useDataFetch(fetchProfileImages, []);

  const [profileImageURL, setProfileImageURL] = useState('');
  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font, setFont] = useState('noto-sans');

  // 프로필 이미지 초기화
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
    setError,
  } = useMessageSubmit(recipient_id);

  // 내용이 비어있는지 확인
  const isContentEmpty =
    !content || content.replace(/<[^>]*>/g, '').trim() === '';

  const handleEditorFontChange = (quillFont) => {
    console.log('에디터에서 감지된 폰트:', quillFont);
    if (quillFont && fontMap[quillFont]) {
      setFont(quillFont);
    }
  };

  // 외부 드롭다운에서 폰트 변경 (표시 이름으로 전달됨)
  const handleDropdownFontChange = (selectedDisplayName) => {
    console.log('드롭다운에서 선택된 표시 이름:', selectedDisplayName);
    // 표시 이름 → Quill 형식으로 역변환
    const fontKey = Object.keys(fontDisplayNames).find(
      (key) => fontDisplayNames[key] === selectedDisplayName
    );
    if (fontKey) {
      console.log('Quill에 적용될 폰트:', fontKey);
      setFont(fontKey);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    setError('');
    if (!fromInput.validate()) {
      return;
    }
    if (isContentEmpty) {
      return;
    }
    if (!profileImageURL || profileImageURL.trim() === '') {
      return;
    }
    if (!relationship || relationship.trim() === '') {
      return;
    }
    if (!font || font.trim() === '') {
      return;
    }

    const fontValue = fontMap[font] || font;
    await submitMessage({
      sender: fromInput.value,
      profileImageURL,
      relationship,
      content,
      font: fontValue, // 'Noto Sans' 형식
    });
  };

  // 생성하기 버튼 활성화 조건
  const isButtonDisabled =
    isSubmitting ||
    !fromInput.value ||
    fromInput.value.trim() === '' ||
    !profileImageURL ||
    profileImageURL.trim() === '' ||
    !relationship ||
    relationship.trim() === '' ||
    isContentEmpty ||
    !font ||
    font.trim() === '';

  const FONT_OPTIONS = Object.values(fontDisplayNames);

  const currentFontDisplayName = fontDisplayNames[font] || 'Noto Sans';

  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-4 py-10 sm:px-6">
      <section className="flex w-full max-w-[720px] flex-col gap-10 sm:max-w-[640px] md:max-w-[720px]">
        {/* From 입력 */}
        <div className="w-full">
          <Title className="mb-[12px]">From.</Title>
          <TextInput
            name="From"
            placeholder="이름을 입력해 주세요"
            {...fromInput}
            className="w-full"
          />
        </div>

        {/* 프로필 이미지 선택 */}
        <div>
          <Title className="mb-[12px]">프로필 이미지</Title>
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
          <Title className="mb-[12px]">상대와의 관계</Title>
          <Dropdown
            items={['친구', '지인', '동료', '가족']}
            placeholder="지인"
            onChange={setRelationship}
            className="w-full"
          />
        </div>

        {/* 내용 입력 */}
        <div className="w-full">
          <Title className="mb-[12px]">내용을 입력해 주세요</Title>
          <TextEditor
            value={content}
            onChange={setContent}
            font={font}
            onFontChange={handleEditorFontChange}
            className="w-full"
          />
        </div>

        {/* 폰트 선택 */}
        <div className="w-full max-w-[320px]">
          <Title className="mb-[12px]">폰트 선택</Title>
          <Dropdown
            items={FONT_OPTIONS}
            selectedItem={currentFontDisplayName}
            placeholder="폰트를 선택하세요"
            onChange={handleDropdownFontChange}
            className="w-full"
          />
        </div>

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
