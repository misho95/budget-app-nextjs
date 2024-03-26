import ProfileForm from "@/app/ui/profile/profile-form";
import Stats from "@/app/ui/stats/stats";
import { auth } from "@/auth";
import { getUserProfile } from "@/libs/action";
import { SquareUser } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = async () => {
  const userSession = await auth();
  const user = await getUserProfile(userSession?.user?.id);

  const { firstname, lastname, username, email } = user;

  const userToPass = {
    firstname,
    lastname,
    username,
    email,
    id: userSession?.user?.id,
  };

  return (
    <div className="p-5 flex flex-col md:flex-row gap-5">
      <div className="min-w-[300px]">
        <div>
          <SquareUser className="size-20 text-black/20" />
        </div>
        <Suspense>
          <ProfileForm user={userToPass} />
        </Suspense>
      </div>
      <div className="w-full">
        <Stats />
      </div>
    </div>
  );
};

export default Profile;
