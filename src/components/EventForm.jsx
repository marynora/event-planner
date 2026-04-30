import { useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldset,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
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
  const [location, setLocation] = useState(initialData.location || "");
  const [startTime, setStartTime] = useState(initialData.startTime || "");
  const [endTime, setEndTime] = useState(initialData.endTime || "");
  const [categoryIds, setCategoryIds] = useState(
    initialData.categoryIds?.map(String) || [],
  );

const [categoryError, setCategoryError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

  if (categoryIds.length === 0) {
    setCategoryError(true);
    return;
  }
  setCategoryError(false);

    onSubmit({
      ...initialData,
      title,
      description,
      image,
      location,
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
            fontSize="xl"
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
            fontSize="xl"
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
            fontSize="xl"
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
            fontSize="xl"
            fontWeight="bold"
          >
            Location
          </Field.Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="xl"
            fontWeight="bold"
          >
            Start time
          </Field.Label>
          <Input
            type="datetime-local"
            value={startTime}
            fontSize="md"
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label
            fontFamily="'Italiana', sans-serif"
            fontSize="xl"
            fontWeight="bold"
          >
            End time
          </Field.Label>
          <Input
            type="datetime-local"
            value={endTime}
            fontSize="md"
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Field.Root>

        <Fieldset.Root>
          <Fieldset.Legend
            fontFamily="'Italiana', sans-serif"
            fontSize="xl"
            fontWeight="bold"
            mb={2}
          >
            Categories
          </Fieldset.Legend>

          <CheckboxGroup
            value={categoryIds}
            onValueChange={(value) => {
              setCategoryIds(value);
              if (value.length > 0) {
                setCategoryError(false);
              }
            }}
          >
            <VStack
              align="start"
              gap={2}
              fontFamily="'Thasadith', sans-serif"
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

          {categoryError && (
            <Text
              color="#950000"
              fontFamily="'Thasadith', sans-serif"
              fontWeight="bold"
              fontSize="lg"
            >
              {" "}
              Please select at least one category.{" "}
            </Text>
          )}
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
