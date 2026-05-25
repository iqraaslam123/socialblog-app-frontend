import { useParams } from 'react-router-dom';
import Profile from '../components/Profile/Profile';

export default function ProfilePage() {
  const { id } = useParams();
  return <Profile userId={id} />;
}