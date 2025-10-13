import { Routes, Route, BrowserRouter } from 'react-router';
import MainLayout from '@/components/common/layout/MainLayout';
import PostLayout from '@/components/common/layout/PostLayout';
import List from '@/pages/List';
import Main from '@/pages/Main';
import Post from '@/pages/Post';
import PostDetail from '@/pages/PostDetail';
import PostEdit from '@/pages/PostEdit';
import PostMessage from '@/pages/PostMessage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="list" element={<List />} />
          <Route path="post">
            <Route index element={<Post />} />
            <Route path=":id/message" element={<PostMessage />} />
          </Route>
        </Route>
        <Route element={<PostLayout />}>
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
