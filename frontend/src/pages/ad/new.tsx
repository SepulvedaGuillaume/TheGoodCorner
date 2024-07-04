import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/NewAd.module.sass";
import adService from "@/services/api/adService";
import categoryService from "@/services/api/categoryService";
import tagService from "@/services/api/tagService";
import Loader from "@/components/Loader";
import { SingleValue, MultiValue } from "react-select";
import type { CategoryProps, TagProps } from "@/types";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";
import { useCategory } from "@/contexts/categoryContext";
import type { FormData, OptionType } from "@/types";

export default function NewAd() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [tags, setTags] = useState<OptionType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SingleValue<OptionType>>(null);
  const [selectedTags, setSelectedTags] = useState<MultiValue<OptionType>>([]);
  const { updateCategories } = useCategory();

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categories = await categoryService.getCategories();
        setCategories(
          categories?.map((category: CategoryProps) => ({
            value: category.name,
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
          })) ?? []
        );

        const tags: TagProps[] | undefined = await tagService.getTags();
        setTags(
          tags?.map((tag: TagProps) => ({
            value: tag.name,
            label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
          })) ?? []
        );
      } catch (error) {
        console.error("Failed to fetch categories and tags:", error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await adService.postAd(data);
  
      if (response) {
        const { status } = response;
  
        if (status === 201) {
          setSuccess(true);
          setError("");
          reset();
          setSelectedCategory(null);
          setSelectedTags([]);
          updateCategories();
        } else {
          setError("Failed to post ad. Please try again.");
        }
      } else {
        setError("Failed to post ad. Please try again.");
      }
    } catch (error) {
      console.error("Failed to post ad:", error);
      setError((error as Error).message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  return (
    <div className={styles["new-ad-container"]}>
      <h1 className={styles["new-ad-title"]}>Créer une nouvelle annonce</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["new-ad-form"]}>
        <InputField
          label="Titre de l'annonce"
          name="title"
          register={register}
          required={true}
          error={errors.title}
        />
        <TextAreaField
          label="Description de l'annonce"
          name="description"
          register={register}
          required={false}
        />
        <InputField
          label="Propriétaire de l'annonce"
          name="owner"
          register={register}
          required={true}
          error={errors.owner}
        />
        <InputField
          label="Prix de l'annonce"
          type="number"
          min={0}
          name="price"
          register={register}
          required={true}
          error={errors.price}
        />
        <InputField
          label="Image de l'annonce"
          name="picture"
          register={register}
          required={false}
          error={errors.picture}
        />
        <InputField
          label="Localisation de l'annonce"
          name="location"
          register={register}
          required={true}
          error={errors.location}
        />
        <SelectField
          label="Catégorie de l'annonce"
          required={true}
          options={categories}
          isMulti={false}
          value={selectedCategory}
          onChange={(selectedOption: SingleValue<OptionType>) => {
            const category = selectedOption ? selectedOption.value : "";
            setValue("category", category);
            setSelectedCategory(selectedOption);
          }}
          control={control}
          name="category"
          error={errors.category}
        />
        <SelectField
          label="Tags de l'annonce"
          required={false}
          options={tags}
          isMulti={true}
          value={selectedTags}
          onChange={(selectedOptions: MultiValue<OptionType>) => {
            const tags = selectedOptions
              ? selectedOptions.map((option) => option.value)
              : [];
            setValue("tags", tags);
            setSelectedTags(selectedOptions);
          }}
          control={control}
          name="tags"
          error={errors.tags}
        />

        <button type="submit" className={styles["new-ad-form-button"]}>
          Publier
        </button>
        {error && <span className={styles["new-ad-form-error"]}>{error}</span>}
        {success && (
          <span className={styles["new-ad-form-success"]}>
            Annonce publiée avec succès
          </span>
        )}
        {isLoading && <Loader />}
      </form>
    </div>
  );
}
