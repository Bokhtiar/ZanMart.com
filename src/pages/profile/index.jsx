
import ProfileInfo from "@/components/ProfileInfo";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
const Profile = () => {

 
  return (
    <div>
      <ProfileInfo   />
    </div>
  );
};
Profile.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default Profile;
