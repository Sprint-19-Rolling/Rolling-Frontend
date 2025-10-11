import { useState } from 'react';
import { useParams } from 'react-router';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropbox/Dropdown';
import ProfileImage from '@/components/common/profile-image/ProfileImage';
import TextEditor from '@/components/common/TextEditor';
import TextInput from '@/components/common/TextInput';
import Title from '@/components/common/Title';
import { useInput } from '@/hooks/useInput';
import { useMessageSubmit } from '@/hooks/useMessageSubmit';
import { useProfileImages } from '@/hooks/useProfileImages';

const PostMessage = () => {
  const { id } = useParams();
  const recipient_id = id;

  const fromInput = useInput({
    label: '보내는 사람',
    customErrorMessage: '이름을 입력해 주세요',
  });

  //  프로필 이미지 관리
  const { profileImages, profileImageURL, setProfileImageURL } =
    useProfileImages();

  //  메시지 제출 관리
  const {
    handleSubmit: submitMessage,
    isSubmitting,
    error,
    setError,
  } = useMessageSubmit(recipient_id);

  const [relationship, setRelationship] = useState('지인');
  const [content, setContent] = useState('');
  const [font] = useState('Noto Sans');

  //  내용 비어있는지 확인
  const isContentEmpty =
    !content || content.replace(/<[^>]*>/g, '').trim() === '';

  //  메시지 생성 API 호출
  const handleSubmit = async () => {
    if (!fromInput.validate()) {
      return;
    }
    if (isContentEmpty) {
      setError('내용을 입력해주세요.');
      return;
    }

    await submitMessage({
      sender: fromInput.value,
      profileImageURL,
      relationship,
      content,
      font,
    });
  };

  //  버튼 활성화 조건
  const isButtonDisabled =
    isSubmitting ||
    !fromInput.value.trim() ||
    !profileImageURL ||
    !relationship ||
    isContentEmpty;

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
            {/* 선택된 프로필 */}
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

            {/* 이미지 리스트 */}
            <div className="mt-4 flex-grow sm:ml-[12px] sm:mt-0">
              <p className="mb-3 text-center text-base font-medium text-gray-600 sm:text-left">
                프로필 이미지를 선택해주세요!
              </p>
              <div className="flex flex-wrap justify-center gap-[5px] sm:justify-start">
                {profileImages.length > 0 ? (
                  profileImages.map((url, index) => {
                    return (
                      <ProfileImage
                        key={index}
                        src={url}
                        size="medium"
                        isSelected={profileImageURL === url}
                        isClickable={true}
                        onClick={() => setProfileImageURL(url)}
                      />
                    );
                  })
                ) : (
                  <p className="mt-2 text-sm text-gray-400">
                    프로필 이미지를 불러오는 중...
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
            onChange={(value) => setRelationship(value)}
            className="w-full"
          />
        </div>

        {/* 내용 입력 */}
        <div className="w-full">
          <Title>내용을 입력해 주세요</Title>
          <TextEditor
            value={content}
            onChange={setContent}
            className="w-full"
          />
        </div>

        {/* 에러 메시지 */}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`h-[56px] w-full rounded-[12px] text-lg font-semibold text-white transition sm:w-[640px] md:w-[720px] ${
              isButtonDisabled
                ? 'cursor-not-allowed bg-gray-300'
                : 'cursor-pointer bg-[#9935FF] hover:bg-[#8A1FFF]'
            }`}>
            {isSubmitting ? '생성 중...' : '생성하기'}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PostMessage;
