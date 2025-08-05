import { createUuid } from '@/src/lib/uuid';
import { useTodoStore } from '@/src/store/store-todo';
import { Todo } from '@/src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { z } from 'zod';
import { useTheme } from '../../ThemeProvider';
import { Box } from '../../ui/box';
import { Button } from '../../ui/button';
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from '../../ui/form-control';
import { HStack } from '../../ui/h-stack';
import { Input, InputField } from '../../ui/input';

const todoValidation = z.object({
  text: z.string().min(6, { error: 'Atleast 6 characters are required.' }),
});
type TodoValidation = z.infer<typeof todoValidation>;

export default function TodoInput() {
  const { addTodo, todos } = useTodoStore();
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoValidation>({
    resolver: zodResolver(todoValidation),
  });

  const onSubmit = (values: TodoValidation) => {
    const id = createUuid();
    const todo: Todo = {
      id,
      text: values.text,
    };
    addTodo(todo);
    reset();
    Keyboard.dismiss();
  };

  return (
    <HStack space="md" className="justify-between items-start">
      <Box className="w-[83%]">
        <FormControl
          isInvalid={!!errors.text}
          size="lg"
          isDisabled={false}
          isReadOnly={false}
          isRequired={true}>
          <Controller
            control={control}
            name="text"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size={'lg'}
                variant="rounded"
                className="h-14 rounded-3xl relative border-0 bg-neutral-700">
                <LinearGradient
                  colors={theme === 'dark' ? ['#52525b', '#3f3f46'] : ['#fafaf9', '#f5f5f4']}
                  className="w-full h-full absolute inset-0">
                  <InputField
                    type="text"
                    placeholder="What needs to be done?"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                </LinearGradient>
              </Input>
            )}
          />

          {errors.text?.message && (
            <FormControlError>
              <FormControlErrorIcon
                as={() => <Ionicons size={18} name="alert-circle" color="#f43f5e" />}
              />
              <FormControlErrorText>{errors.text.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      </Box>
      <Button
        onPress={handleSubmit(onSubmit)}
        variant="outline"
        className="relative rounded-full w-14 h-14 p-0 border-0 overflow-hidden">
        <LinearGradient
          colors={theme === 'dark' ? ['#52525b', '#3f3f46'] : ['#fafafa', '#f5f5f4']}
          className="w-full h-full absolute inset-0 rounded-full flex items-center justify-center">
          <Ionicons size={19} name="add-outline" color={'#a1a1aa'} />
        </LinearGradient>
      </Button>
    </HStack>
  );
}
