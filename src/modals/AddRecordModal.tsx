import { useState, type Dispatch, type SetStateAction } from "react";
import Button from "../components/primitives/buttons/Button";
import { TextArea } from "../components/primitives/inputs/TextArea";
import { TextField } from "../components/primitives/inputs/TextFields";
import { Modal } from "../components/ui/modals/BasicModal";
import { useAddMedicalRecord } from "../hooks/usePatients";


const initialState = { entry_type: "", description: "" };

const AddRecordModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { mutate, isPending, isError, error, reset } = useAddMedicalRecord();
  const [form, setForm] = useState(initialState);

  const closeAndReset = () => {
    setForm(initialState);
    reset();
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!form.entry_type.trim() || !form.description.trim()) return;
    mutate(form, { onSuccess: closeAndReset });
  };

  const apiMessage = (error as any)?.response?.data?.message;

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Header title="Add New Medical Record" />
      <Modal.Body>
        {isError && (
          <p className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-red-700">
            {apiMessage ?? "Could not add this record. Please try again."}
          </p>
        )}

        <TextField
          placeholder="Enter here..."
          label="Medical Entry Type"
          value={form.entry_type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, entry_type: e.target.value }))
          }
        />
        <TextArea
          placeholder="Enter Description"
          label="Entry Description"
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" variant="light" className="text-primary border" onClick={closeAndReset}>
          Cancel
        </Button>
        <Button type="button" className="bg-primary" onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Adding…" : "Add Record"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRecordModal;
