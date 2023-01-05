import type { ElForm, FormItemRule } from "element-plus";

export type IElForm = InstanceType<typeof ElForm>;

export type IElFormRules = Record<string, FormItemRule[]>;
