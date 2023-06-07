'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";


import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import ConfirmDialog from "../components/ConfirmDialog";


interface PropertiesClientProps {
  listings: Listing[],
  currentUser?: User | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [actionId, setActionId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const onDelete = async () => {
    await axios.delete(`/api/listings/${actionId}`)
      .then(() => {
        toast.success('Listing deleted');
        setOpenDeleteDialog(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.')
      }).finally(() => {
        setActionId('');
      })
  };

  const deleteListingDialog = (
    <ConfirmDialog
      isOpen={openDeleteDialog}
      title="Are you sure you want to delete this reservation?"
      subtitle="This action cannot be undone!"
      onConfirm={onDelete}
      onDismiss={() => {
        setOpenDeleteDialog(false);
        setActionId('');
      }}
      actionLabel="Delete"
    />
  );

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        <>{deleteListingDialog}</>
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={() => { setActionId(listing.id); setOpenDeleteDialog(true) }}
            disabled={actionId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
            isHost
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;