import type { Dispatch, SetStateAction } from "react";
import Button from "../components/primitives/buttons/Button";
import { TextArea } from "../components/primitives/inputs/TextArea";
import { TextField } from "../components/primitives/inputs/TextFields";
import { Modal } from "../components/ui/modals/BasicModal"


const AddRecordModal = ({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
    return(
        <Modal open={open} onOpenChange={setOpen}> 
            <Modal.Header title="Add New Medical Record"/>
            <Modal.Body>
                <TextField placeholder="Enter here..." label="Medical Entry Type" />
                <TextArea placeholder="Enter Description" label="Entry Description"/>
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" variant="light" className="text-primary border">Cancel</Button>
                <Button type="button" className="bg-primary">Add Record</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRecordModal;
