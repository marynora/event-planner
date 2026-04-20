import { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";
import { useEvents } from "../context/EventsContext";

export const EventForm = ({
  onSubmit,
  initialData = {},
  submitButtonText = "Save Event",
}) => {
  const { categories } = useEvents();

  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [image, setImage] = useState(initialData.image || "");
  const [startTime, setStartTime] = useState(initialData.startTime || "");
  const [endTime, setEndTime] = useState(initialData.endTime || "");
  const [categoryIds, setCategoryIds] = useState(
    initialData.categoryIds?.map(String) || [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (categoryIds.length === 0) {
      toaster.create({
        title: "Please select at least one category.",
        type: "error",
      });
      return;
    }

    onSubmit({
      ...initialData,
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: categoryIds.map(Number),
    });
  };

  return (        
    <form onSubmit={handleSubmit}>
      <VStack gap={4} align="stretch">
        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
          >
            Title
          </Field.Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
          >
            Description
          </Field.Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
          >
            Image URL
          </Field.Label>
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
          >
            Start time
          </Field.Label>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
          >
            End time
          </Field.Label>
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Field.Root>

        <Fieldset.Root>
          <Fieldset.Legend
            fontFamily="'Italiana', sans-serif"
            fontSize="lg"
            fontWeight="bold"
            mb={2}
          >
            Categories
          </Fieldset.Legend>

          <CheckboxGroup value={categoryIds} onValueChange={setCategoryIds}>
            <VStack
              align="start"
              gap={2}
              fontFamily="'Thasadith', sans-serif"
              fontSize="sm"
              fontWeight="bold"
            >
              {categories.map((category) => (
                <Checkbox.Root key={category.id} value={String(category.id)}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control
                    border="2px solid"
                    borderColor="#684a29"
                    bg="transparent"
                    _checked={{
                      bg: "#ad876679",
                      borderColor: "#684a29",
                    }}
                  />
                  <Checkbox.Label fontSize="lg" fontWeight="bold">
                    {category.name}
                  </Checkbox.Label>
                </Checkbox.Root>
              ))}
            </VStack>
          </CheckboxGroup>
        </Fieldset.Root>

        <Button
          bg="#4c361e"
          color="white"
          fontFamily="'Thasadith', sans-serif"
          fontWeight="bold"
          fontSize="lg"
          type="submit"
        >
          {submitButtonText}
        </Button>
      </VStack>
    </form> 
   
  );
};
