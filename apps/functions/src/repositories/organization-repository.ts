import { Service } from "typedi";

import { Organization } from "@/entities/organization";
import BaseRepository from "@/repositories/base-repository";

const COLLECTION: string = "organizations";

@Service()
export default class OrganizationRepository extends BaseRepository<Organization> {
  async findById(id: string): Promise<Organization | null> {
    try {
      const doc = await this.db.collection(COLLECTION).doc(id).get();
      return doc.exists ? (doc.data() as Organization) : null;
    } catch (error) {
      console.error(`Error fetching organization with id ${id}: `, error);
      return null;
    }
  }

  async create(organization: Organization): Promise<void> {
    await this.db
      .collection(COLLECTION)
      .doc(organization.id)
      .withConverter(this.converter())
      .set(organization);
  }

  async createAll(organizations: Organization[]): Promise<void> {
    const batch = this.db.batch();

    organizations.forEach(organization => {
      const docRef = this.db
        .collection(COLLECTION)
        .doc(organization.id)
        .withConverter(this.converter());
      batch.set(docRef, organization);
    });

    await batch.commit();
  }
}
