import { Experiment_DrupalClient as DrupalClient } from "next-drupal"

export const drupal = new DrupalClient(process.env.NEXT_PUBLIC_DRUPAL_BASE_URL)
