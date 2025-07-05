import ProfileCard from "@/components/dashboard/ProfileCard";
import WithdrawTable from "@/components/dashboard/WithdrawTable";

const ProfilePage = () => {

  return (
    <div className="flex bg-gray-100">
      <main className="flex-1">
        <div className="flex w-full gap-8 items-start">
          <ProfileCard />
          <WithdrawTable />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 