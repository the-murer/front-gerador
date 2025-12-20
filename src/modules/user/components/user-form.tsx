import { DefaultInput } from '@/ui/components/input/input'
import { InputTypes } from '@/ui/components/input/input-map'
import { useForm, type Control } from 'react-hook-form'

export const UserForm = ({ control }: { control: Control<any> }) => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form>
      <DefaultInput
        type={InputTypes.TEXT}
        name="name"
        label="Nome"
        control={control}
      />
    </form>
  )
}
