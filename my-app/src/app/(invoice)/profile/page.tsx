import ProfileForm from "@/app/ui/profile/profile-form";
import { getUserProfile } from "@/libs/action";
import { SquareUser } from "lucide-react";
import { Suspense } from "react";

const Profile = async () => {
  const user = await getUserProfile();

  const { firstname, lastname, username, email } = user;

  const userToPass = { firstname, lastname, username, email };

  return (
    <div className="p-5 flex flex-col gap-5">
      <div>
        <SquareUser className="size-20 text-black/20" />
      </div>
      <Suspense>
        <ProfileForm user={userToPass} />
      </Suspense>
    </div>
  );
};

export default Profile;
