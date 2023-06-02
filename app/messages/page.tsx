
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import MessagesClient from "./MessagesClient";
import getMessages from "../actions/getMessages";


interface IParams {
  receiverId?: string
}

const MessagesPage = async () => {
  const currentUser = await getCurrentUser();
  //let params:IParams={};

  //params ={receiverId:currentUser?.id};

  //const messsages = await getMessages(params);

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
      <MessagesClient
        //messsages={messsages}
        //currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default MessagesPage;
