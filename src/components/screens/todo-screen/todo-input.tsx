import { createUuid } from '@/src/lib/uuid';
import { useTodoStore } from '@/src/store/todo-store';
import { Todo } from '@/src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
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
import { Toast, ToastDescription, ToastTitle, useToast } from '../../ui/toast';

const todoValidation = z.object({
  text: z.string().min(3, { error: 'Atleast 3 characters are required' }),
});
type TodoValidation = z.infer<typeof todoValidation>;

export default function TodoInput() {
  const addTodo = useTodoStore(store => store.addTodo);
  const toast = useToast();

  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoValidation>({
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = (values: TodoValidation) => {
    const { success, data, error } = todoValidation.safeParse(values);
    if (!success) {
      const { fieldErrors } = error.flatten();
      const firstError = Object.values(fieldErrors)[0]?.[0] ?? 'There is an error';
      showErrorToast({ message: firstError });
      return;
    }
    const id = createUuid();
    const todo: Todo = {
      id,
      text: data.text,
      isCompleted: false,
    };
    addTodo(todo);
    reset();
    Keyboard.dismiss();
  };

  const showErrorToast = ({ title, message }: { title?: string; message?: string }) => {
    const newId = Math.random();
    toast.show({
      id: String(newId),
      placement: 'top',
      containerStyle: { top: 50 },
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} className="rounded-2xl" action="error" variant="solid">
            {title?.length && <ToastTitle>{title}</ToastTitle>}
            {message?.length && (
              <ToastDescription className="font-inter-medium">{message}</ToastDescription>
            )}
          </Toast>
        );
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Input size={'lg'} variant="rounded" className="h-14 rounded-3xl relative border-0">
                  <LinearGradient
                    colors={theme === 'dark' ? ['#52525b', '#3f3f46'] : ['#d4d4d8', '#fff']}
                    className="w-full h-full absolute inset-0">
                    <InputField
                      type="text"
                      placeholder="What needs to be done?"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      autoFocus={false}
                    />
                  </LinearGradient>
                </Input>
              )}
            />

            {errors.text?.message && (
              <FormControlError>
                <FormControlErrorIcon
                  as={() => <Ionicons size={15} name="alert-circle" color="#f43f5e" />}
                />
                <FormControlErrorText className="text-sm">
                  {errors.text.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        </Box>
        <Button
          onPress={handleSubmit(onSubmit)}
          variant="outline"
          className="relative rounded-full w-14 h-14 p-0 border-0 overflow-hidden">
          <LinearGradient
            colors={theme === 'dark' ? ['#52525b', '#3f3f46'] : ['#d4d4d8', '#fff']}
            className="w-full h-full absolute inset-0 rounded-full flex items-center justify-center">
            <Ionicons size={19} name="add-outline" color={'#a1a1aa'} />
          </LinearGradient>
        </Button>
      </HStack>
    </TouchableWithoutFeedback>
  );
}
