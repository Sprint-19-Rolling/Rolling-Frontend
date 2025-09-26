import { Routes, Route } from 'react-router';
import List from '@/pages/List';
import Main from '@/pages/Main';
import Post from '@/pages/Post';
import PostDetail from '@/pages/PostDetail';
import PostEdit from '@/pages/PostEdit';
import PostMessage from '@/pages/PostMessage';

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/list" element={<List />} />
      <Route path="/post">
        <Route index element={<Post />} />
        <Route path=":id" element={<PostDetail />} />
        <Route path=":id/edit" element={<PostEdit />} />
        <Route path=":id/message" element={<PostMessage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
