import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "@/styles/NewAd.module.sass";
import Loader from "@/components/Loader";
import { SingleValue, MultiValue } from "react-select";
import type { CategoryProps, TagProps } from "@/types";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";
import { useCategory } from "@/contexts/categoryContext";
import type { FormData, OptionType } from "@/types";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_AD_MUTATION } from "@/graphql/adsMutation";
import { GET_ALL_CATEGORIES_QUERY } from "@/graphql/categoriesQuery";
import { GET_ALL_TAGS_QUERY } from "@/graphql/tagsQuery";
import { GET_ALL_ADS_QUERY } from "@/graphql/adsQuery";
import {
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllTagsQuery,
  GetAllTagsQueryVariables,
  CreateAdMutation,
  CreateAdMutationVariables,
} from "@/__generated__/graphql";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<OptionType[]>([]);
  const [tags, setTags] = useState<OptionType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SingleValue<OptionType>>(null);
  const [selectedTags, setSelectedTags] = useState<MultiValue<OptionType>>([]);
  const { updateCategories } = useCategory();

  const { data: categoriesQuery } = useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GET_ALL_CATEGORIES_QUERY);
  const { data: tagsQuery } = useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GET_ALL_TAGS_QUERY);
  const [createAd, { data }] = useMutation<
    CreateAdMutation,
    CreateAdMutationVariables
  >(CREATE_AD_MUTATION, {
    refetchQueries: [{ query: GET_ALL_ADS_QUERY }],
  });

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await categoriesQuery?.getAllCategories;
        const tagsData = await tagsQuery?.getAllTags;

        const transformedCategories =
          categoriesData?.map((category: CategoryProps) => ({
            id: category.id,
            value: category.name,
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
          })) ?? [];

        const transformedTags =
          tagsData?.map((tag: TagProps) => ({
            id: tag.id,
            value: tag.name,
            label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
          })) ?? [];

        setCategories(transformedCategories);
        setTags(transformedTags);
      } catch (error) {
        console.error("Failed to fetch categories and tags:", error);
        setError("Failed to fetch categories and tags");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndTags();
  }, [categoriesQuery, tagsQuery]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await createAd({
        variables: {
          data: {
            title: data.title,
            description: data.description,
            owner: data.owner,
            price: data.price,
            picture: data.picture,
            location: data.location,
            category: { id: data.category },
            tags: data?.tags?.map((tag: string) => ({ id: tag })) ?? [],
          },
        },
      });

      setSuccess(true);
      setError("");
      reset();
      setSelectedCategory(null);
      setSelectedTags([]);
      updateCategories();
    } catch (error) {
      console.error("Failed to post ad:", error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
