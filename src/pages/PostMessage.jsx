import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropbox/Dropdown';
import FloatingButtonContainer from '@/components/common/FloatingButtonContainer';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import TextEditor from '@/components/common/TextEditor';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import { FONT_ITEMS, RELATIONSHIP_ITEMS } from '@/constants/dropdownItems';
import { FONT_DISPLAY_NAMES } from '@/constants/fontMap';
import { useInput } from '@/hooks/useInput';
import usePostMessage from '@/hooks/usePostMessage';
import useProfileImages from '@/hooks/useProfileImages';

const PostMessage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fromInput = useInput({
    customErrorMessage: '이름을 입력해 주세요',
  });

  const relationshipRef = useRef();
  const fontRef = useRef();

  const [content, setContent] = useState('');
  const [profileImageURL, setProfileImageURL] = useState('');
  const [selectedFont, setSelectedFont] = useState('Noto Sans');

  const { loading, profileImages } = useProfileImages();
  const { isSubmitting, submitMessage } = usePostMessage();

  // 오른쪽 리스트에서 첫 번째 이미지를 제외한 이미지들 관리
  const [rightImages, setRightImages] = useState([]);

  useEffect(() => {
    if (!loading && profileImages && profileImages.length > 0) {
      // 첫 번째 이미지를 왼쪽 기본 이미지로 세팅
      setProfileImageURL(profileImages[0]);

      // 오른쪽 이미지는 첫 번째 이미지를 제외한 나머지 이미지들
      setRightImages(profileImages.slice(1));
    }
  }, [loading, profileImages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const relationship = relationshipRef.current?.getValue();
    const font = fontRef.current?.getValue();

    const messageData = {
      team: '19-7',
      recipientId: Number(id),
      sender: fromInput.value,
      profileImageURL,
      relationship,
      content,
      font,
    };

    submitMessage({
      recipientId: id,
      messageData,
      onSuccess: () => navigate(`/post/${id}`),
    });
  };

  const isContentEmpty =
    !content || content.replace(/<[^>]*>/g, '').trim() === '';

  const isButtonDisabled =
    isSubmitting ||
    isContentEmpty ||
    !fromInput.value?.trim() ||
    !profileImageURL?.trim() ||
    !relationshipRef.current?.getValue() ||
    !fontRef.current?.getValue();

  return (
    <form
      className="mx-auto flex max-w-[720px] flex-col gap-[50px] pb-20 pt-12"
      onSubmit={handleSubmit}>
      {/* From 입력 */}
      <div className="flex flex-col gap-4">
        <label
          htmlFor="From"
          className="font-20-bold md:font-24-bold text-gray-900">
          From.
        </label>
        <TextInput
          name="From"
          placeholder="이름을 입력해 주세요"
          {...fromInput}
        />
      </div>

      {/* 프로필 이미지 선택 영역 */}
      <div>
        <Title className="mb-[12px]">프로필 이미지</Title>
        <div className="mt-2 flex flex-row items-start gap-4">
          {/* 왼쪽 - 선택된 프로필 이미지 */}
          <div className="mt-[20px] flex flex-shrink-0 sm:mt-[7px]">
            {profileImageURL && (
              <ProfileImage
                src={profileImageURL}
                size="xlarge"
                borderColor="gray"
                isSelected={false}
                isClickable={false}
              />
            )}
          </div>

          {/* 오른쪽 - 선택 가능한 이미지 리스트 */}
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-base font-medium text-gray-700">
              프로필 이미지를 선택해주세요!
            </p>
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-[2px]">
              {loading ? (
                <p className="w-full text-sm text-gray-400">
                  프로필 이미지를 불러오는 중...
                </p>
              ) : rightImages && rightImages.length > 0 ? (
                rightImages.map((url) => {
                  return (
                    <div key={url} className="w-[calc(20%-8px)] sm:w-auto">
                      <ProfileImage
                        src={url}
                        size="medium"
                        isSelected={profileImageURL === url}
                        isClickable={true}
                        onClick={() => setProfileImageURL(url)}
                        className="!h-auto !w-full sm:!h-[64px] sm:!w-[64px]"
                      />
                    </div>
                  );
                })
              ) : (
                <p className="w-full text-sm text-gray-400">
                  사용할 수 있는 이미지가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 관계 선택 */}
      <div className="flex flex-col gap-4">
        <Title>상대와의 관계</Title>
        <Dropdown
          ref={relationshipRef}
          items={RELATIONSHIP_ITEMS}
          defaultValue="지인"
        />
      </div>

      {/* 내용 입력 */}
      <div className="flex flex-col gap-4">
        <Title>내용을 입력해 주세요</Title>
        <TextEditor
          value={content}
          onChange={setContent}
          font={selectedFont}
          onFontChange={(fontKey) => {
            if (!fontKey) {
              return;
            }
            setSelectedFont(fontKey);

            const displayName = FONT_DISPLAY_NAMES[fontKey];
            if (displayName && fontRef.current?.setValue) {
              fontRef.current.setValue(displayName);
            }
          }}
        />
      </div>

      {/* 폰트 선택 */}
      <div className="flex flex-col gap-4">
        <Title>폰트 선택</Title>
        <Dropdown
          ref={fontRef}
          items={FONT_ITEMS}
          defaultValue="Noto Sans"
          onSelect={() => {
            const selectedDisplayName = fontRef.current?.getValue();
            if (!selectedDisplayName) {
              return;
            }

            const fontKey = Object.keys(FONT_DISPLAY_NAMES).find(
              (key) => FONT_DISPLAY_NAMES[key] === selectedDisplayName
            );

            if (fontKey) {
              setSelectedFont(fontKey);
            }
          }}
        />
      </div>

      {/* 제출 버튼 */}
      <FloatingButtonContainer>
        <Button
          type="submit"
          disabled={isButtonDisabled}
          size={56}
          className="w-full">
          {isSubmitting ? '생성 중...' : '생성하기'}
        </Button>
      </FloatingButtonContainer>
    </form>
  );
};

export default PostMessage;
