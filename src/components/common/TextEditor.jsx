import { useState, useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../style/base/quill-custom.css';

const Font = Quill.import('formats/font');
Font.whitelist = ['noto-sans', 'pretendard', 'nanum-myeongjo', 'handletter'];
Quill.register(Font, true);

const TextEditor = () => {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);

  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    const editor = reactQuillRef.current.getEditor();
    const container = editor.root;

    const updateListButtons = () => {
      const selection = editor.getSelection();
      if (!selection) {
        return;
      }

      const [leaf] = editor.getLeaf(selection.index);
      let currentNode = leaf?.domNode;

      let isCheckList = false;
      let isOrderedList = false;
      let isBulletList = false;

      while (currentNode && currentNode !== editor.root) {
        if (currentNode.tagName === 'LI') {
          const listType = currentNode.getAttribute('data-list');
          if (listType === 'check') {
            isCheckList = true;
          } else if (listType === 'ordered') {
            isOrderedList = true;
          } else if (listType === 'bullet') {
            isBulletList = true;
          }
          break;
        }
        currentNode = currentNode.parentElement;
      }

      const toolbar = document.querySelector('.ql-toolbar');
      const checkButton = toolbar?.querySelector(
        'button.ql-list[value="check"]'
      );
      const orderedButton = toolbar?.querySelector(
        'button.ql-list[value="ordered"]'
      );
      const bulletButton = toolbar?.querySelector(
        'button.ql-list[value="bullet"]'
      );

      if (checkButton) {
        checkButton.classList.toggle('ql-active', isCheckList);
      }
      if (orderedButton) {
        orderedButton.classList.toggle('ql-active', isOrderedList);
      }
      if (bulletButton) {
        bulletButton.classList.toggle('ql-active', isBulletList);
      }
    };

    const handleClick = (e) => {
      const listItem = e.target.closest('li[data-list="check"]');
      if (!listItem) {
        return;
      }

      const isChecked = listItem.getAttribute('data-checked') === 'true';
      listItem.setAttribute('data-checked', String(!isChecked));

      const blot = Quill.find(listItem);
      if (blot) {
        const index = editor.getIndex(blot);
        editor.setSelection(index, 0);
      }

      setTimeout(updateListButtons, 10);
    };

    const updateChecklistColors = () => {
      const checkItems = container.querySelectorAll('li[data-list="check"]');
      checkItems.forEach((item) => {
        const isChecked = item.getAttribute('data-checked') === 'true';
        const uiElement = item.querySelector('.ql-ui');
        if (uiElement) {
          uiElement.setAttribute(
            'data-color-init',
            isChecked ? 'purple' : 'gray'
          );
        }
      });
    };

    setTimeout(updateListButtons, 100);
    setTimeout(updateChecklistColors, 100);

    editor.on('selection-change', updateListButtons);
    editor.on('text-change', () => {
      updateListButtons();
      updateChecklistColors();
    });
    container.addEventListener('click', handleClick);

    return () => {
      editor.off('selection-change', updateListButtons);
      editor.off('text-change', updateListButtons);
      container.removeEventListener('click', handleClick);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ header: [3, 4, 5, false] }],
          ['image', 'link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
            },
            {
              background: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
            },
          ],
          ['clean'],
        ],
        handlers: {
          clean: function () {
            const range = this.quill.getSelection();
            if (range) {
              this.quill.removeFormat(range.index, range.length);
              if (range.length > 0) {
                this.quill.formatText(
                  range.index,
                  range.length,
                  'font',
                  'noto-sans'
                );
              }
            }
          },
        },
      },
    }),
    []
  );

  return (
    <div className="editor-wrapper-react">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder="여기에 내용을 입력해주세요."
      />
    </div>
  );
};

export default TextEditor;
