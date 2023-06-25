
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ProfilePage from "./ProfilePage";


const HostDashboard = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to access this page"
          showLogin
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ProfilePage
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default HostDashboard;
