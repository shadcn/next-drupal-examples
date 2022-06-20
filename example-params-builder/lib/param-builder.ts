import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { params } from "lib/params"

export class ParamBuilder extends DrupalJsonApiParams {
  get<T extends keyof typeof params, R extends Parameters<typeof params[T]>[1]>(
    name: T,
    opts: R = null
  ) {
    const query = params[name]

    return query(this.clear(), opts)
  }
}

export const paramBuilder = new ParamBuilder()
