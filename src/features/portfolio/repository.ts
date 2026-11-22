import { DEMONSTRATION_PROJECTS } from "@/content/projects";
import type { ProjectCategory, ProjectRecord } from "@/types/domain";

/**
 * Clean abstraction layer for portfolio retrieval.
 * Swap this implementation for a CMS or database adapter in a future phase
 * without modifying any route or UI components.
 */
export interface PortfolioRepository {
  getAllProjects(): ProjectRecord[];
  getFeaturedProjects(): ProjectRecord[];
  getProjectBySlug(slug: string): ProjectRecord | undefined;
  getProjectsByCategory(category: ProjectCategory): ProjectRecord[];
  getAllSlugs(): string[];
}

export const portfolioRepository: PortfolioRepository = {
  getAllProjects() {
    return [...DEMONSTRATION_PROJECTS];
  },
  getFeaturedProjects() {
    return DEMONSTRATION_PROJECTS.filter((project) => project.featured);
  },
  getProjectBySlug(slug: string) {
    return DEMONSTRATION_PROJECTS.find((project) => project.slug === slug);
  },
  getProjectsByCategory(category: ProjectCategory) {
    return DEMONSTRATION_PROJECTS.filter(
      (project) => project.category === category
    );
  },
  getAllSlugs() {
    return DEMONSTRATION_PROJECTS.map((project) => project.slug);
  },
};
