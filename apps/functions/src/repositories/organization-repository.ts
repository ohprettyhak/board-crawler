import { Service } from "typedi";

import { Organization } from "@/entities/organization";
import { converter } from "@/libs/firestore-converter";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION: string = "organizations";

@Service()
export class OrganizationRepository extends BaseRepository {
  async findById(id: string): Promise<Organization | null> {
    try {
      const doc = await this.db.collection(COLLECTION).doc(id).get();
      return doc.exists ? (doc.data() as Organization) : null;
    } catch (error) {
      console.error(`Error fetching organization with id ${id}: `, error);
      return null;
    }
  }

  async save(organization: Organization): Promise<void> {
    await this.db
      .collection(COLLECTION)
      .doc(organization.id)
      .withConverter(converter<Organization>())
      .set(organization);
  }
}
