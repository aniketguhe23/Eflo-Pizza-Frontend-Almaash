"use client";

import { useUserStore } from "@/app/store/useUserStore";
import { useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import DeliveryAddressModal from "../../cart/components/saveAddressModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function AddressesSection() {
  const { user } = useUserStore();
  const { api_updateUserProfile, api_deleteUserAddress } = ProjectApiList();

  const [showModal, setShowModal] = useState(false);
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<"home" | "work" | "others" | null>(null);

  const parseAddress = (addr: string) => {
    const [doorNumber = "", landmark = "", phoneNumber = ""] = addr.split(",");
    return {
      doorNumber: doorNumber.trim(),
      landmark: landmark.trim(),
      phoneNumber: phoneNumber.trim(),
    };
  };

  const handleEditClick = (
    type: "Home" | "Work" | "Others",
    key: "home" | "work" | "others",
    rawAddress: string
  ) => {
    const parsed = parseAddress(rawAddress);
    setEditAddressData({
      phoneNumber: parsed.phoneNumber,
      doorNumber: parsed.doorNumber,
      landmark: parsed.landmark,
      addressType: type,
      addressKey: key,
    });
    setShowModal(true);
  };

  const handleSave = async ({
    phoneNumber,
    doorNumber,
    landmark,
    addressType,
    addressKey,
  }: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: string;
    addressKey?: "home" | "work" | "others";
  }) => {
    const fullAddress = `${doorNumber}, ${landmark}, ${phoneNumber}`;
    const key = addressKey || addressType.toLowerCase();

    try {
      await axios.put(`${api_updateUserProfile}/${user?.waId}`, {
        addressType: key,
        addressValue: fullAddress,
      });

      setShowModal(false);
      setEditAddressData(null);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleDeleteAddress = async () => {
    if (!deleteTarget) return;
    try {
      await axios.put(`${api_deleteUserAddress}/${user?.waId}`, {
        addressType: deleteTarget,
      });

      setShowDeleteModal(false);
      setDeleteTarget(null);
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleAddAddress = () => {
    const availableTypes: { type: string; key: "home" | "work" | "others" }[] = [];

    if (!user?.address_home) availableTypes.push({ type: "Home", key: "home" });
    if (!user?.address_work) availableTypes.push({ type: "Work", key: "work" });
    if (!user?.address_others) availableTypes.push({ type: "Others", key: "others" });

    if (availableTypes.length > 0) {
      const { type, key } = availableTypes[0]; // Pick the first available type
      setEditAddressData({
        phoneNumber: "",
        doorNumber: "",
        landmark: "",
        addressType: type,
        addressKey: key,
      });
      setShowModal(true);
    }
  };

  const noAddresses =
    !user?.address_home && !user?.address_work && !user?.address_others;

  return (
  <div className="space-y-4 max-h-[570px] overflow-y-auto pr-2">
      <h3 className="text-3xl font-bold mb-4">MANAGE ADDRESSES</h3>

      {noAddresses && (
        <div className="text-center text-gray-600 mb-4">No addresses found.</div>
      )}

      {/* Address Cards */}
      {user?.address_home && (
        <AddressCard
          label="HOME"
          value={user.address_home}
          onEdit={() => handleEditClick("Home", "home", user.address_home)}
          onDelete={() => {
            setDeleteTarget("home");
            setShowDeleteModal(true);
          }}
        />
      )}

      {user?.address_work && (
        <AddressCard
          label="WORK"
          value={user.address_work}
          onEdit={() => handleEditClick("Work", "work", user.address_work)}
          onDelete={() => {
            setDeleteTarget("work");
            setShowDeleteModal(true);
          }}
        />
      )}

      {user?.address_others && (
        <AddressCard
          label="OTHERS"
          value={user.address_others}
          onEdit={() => handleEditClick("Others", "others", user.address_others)}
          onDelete={() => {
            setDeleteTarget("others");
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* Add Address Button */}
      {noAddresses ? (
        <button
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={handleAddAddress}
        >
          Add Address
        </button>
      ) : (
        (user?.address_home === null ||
          user?.address_work === null ||
          user?.address_others === null) && (
          <button
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={handleAddAddress}
          >
            Add More Address
          </button>
        )
      )}

      {/* Edit/Add Modal */}
      <DeliveryAddressModal
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
          setDeleteTarget(null);
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
