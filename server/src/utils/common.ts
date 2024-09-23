export const numberEnumToArray = (enums: { [p: string]: string | number }) => {
  return Object.values(enums).filter((value) => typeof value === 'number') as number[]
}
