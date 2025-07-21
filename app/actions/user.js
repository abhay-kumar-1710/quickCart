import { getUserDetailsUpdated2, updatePassword2 } from "@/query/user";



export async function getUserDetailsUpdated(email, dataToUpdate) {
    getUserDetailsUpdated2(email, dataToUpdate)
}

export async function updatePassword(email, dataToUpdate) {
  updatePassword2(email, dataToUpdate);
}