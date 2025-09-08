"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import DeliveryAddressModal from "../../cart/components/saveAddressModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import DeliveryAddressModalNew from "../../cart/components/saveAddressModalNew";

export default function AddressesSectionNew() {
  const { user } = useUserStore();
  const { api_addUserAddress, api_updateUserAddress, api_deleteUserAddressNew } = ProjectApiList();

  const [showModal, setShowModal] = useState(false);
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);

  // Open modal to edit address
  const handleEditClick = (index: number, addr: any) => {
    setEditAddressData({ ...addr, index });
    setShowModal(true);
  };

  // Add or update address
  const handleSave = async ({
    phoneNumber,
    doorNumber,
    landmark,
    addressType,
    index,
  }: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: string;
    index?: number;
  }) => {
    const payload = {
      phone: phoneNumber,
      houseNo: doorNumber,
      address: landmark,
      type: addressType.toLowerCase(),
    };

    try {
      if (index !== undefined) {
        // Update address
        await axios.put(`${api_updateUserAddress}/${user?.waId}/${index}`, payload);
      } else {
        // Add new address
        await axios.post(`${api_addUserAddress}/${user?.waId}`, payload);
      }

      setShowModal(false);
      setEditAddressData(null);
      window.location.reload();
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  // Delete address
  const handleDeleteAddress = async () => {
    if (deleteTargetIndex === null) return;
    try {
      await axios.delete(`${api_deleteUserAddressNew}/${user?.waId}/${deleteTargetIndex}`);
      setShowDeleteModal(false);
      setDeleteTargetIndex(null);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const noAddresses = !user?.addresses || user?.addresses.length === 0;

  return (
    <div className="space-y-4 max-h-[570px] overflow-y-auto pr-2">
      <h3 className="text-3xl font-bold mb-4">MANAGE ADDRESSES</h3>

      {noAddresses && (
        <div className="text-center text-gray-600 mb-4">No addresses found.</div>
      )}

      {/* Address Cards */}
      {user?.addresses?.map((addr: any, index: number) => (
        <AddressCard
          key={index}
          label={addr.type.toUpperCase()}
          value={`${addr.houseNo}, ${addr.address}, ${addr.phone}`}
          onEdit={() => handleEditClick(index, { ...addr, index })}
          onDelete={() => {
            setDeleteTargetIndex(index);
            setShowDeleteModal(true);
          }}
        />
      ))}

      {/* Add Address Button */}
      <button
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={() => {
          setEditAddressData(null);
          setShowModal(true);
        }}
      >
        Add Address
      </button>

      {/* Edit/Add Modal */}
      <DeliveryAddressModalNew
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditAddressData(null);
        }}
        onSave={handleSave}
        initialData={editAddressData}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTargetIndex(null);
        }}
        onConfirm={handleDeleteAddress}
      />
    </div>
  );
}

const AddressCard = ({
  label,
  value,
  onEdit,
  onDelete,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="border border-[#ED722E] shadow-sm bg-white p-4 pl-10">
    <h4 className="text-lg font-bold mb-2">{label}</h4>
    <p className="text-base text-gray-600 mb-4 whitespace-pre-line">{value}</p>
    <div className="flex gap-2">
      <button
        className="border border-[#ED722E] text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-50 cursor-pointer"
        onClick={onEdit}
      >
        EDIT
      </button>
      <button
        className="border border-[#ED722E] text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-50 cursor-pointer"
        onClick={onDelete}
      >
        DELETE
      </button>
    </div>
  </div>
);
