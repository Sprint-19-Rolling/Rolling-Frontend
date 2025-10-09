import { Routes, Route, BrowserRouter } from 'react-router';
import MainLayout from '@/components/common/layout/MainLayout';
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
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/edit" element={<PostEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
