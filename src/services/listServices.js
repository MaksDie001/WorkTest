
import listRepositories from "@/repositories/listRepositories.js";

export default {
    async fetchAll() {
        return await listRepositories.GetALL();
    }
}