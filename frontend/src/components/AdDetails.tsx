import { useState, useEffect } from "react";
import styles from "@/styles/AdDetails.module.sass";
import styles2 from "@/styles/NewAd.module.sass";
import Button from "./Button";
import { useBasket } from "@/contexts/basketContext";
import adService from "@/services/api/adService";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES_QUERY } from "@/graphql/categoriesQuery";
import { GET_ALL_TAGS_QUERY } from "@/graphql/tagsQuery";
import type { FormData, OptionType } from "@/types";
import Loader from "@/components/Loader";
import { SingleValue, MultiValue } from "react-select";
import type { AdDetailsProps, CategoryProps, TagProps } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/components/InputField";
import TextAreaField from "@/components/TextAreaField";
import SelectField from "@/components/SelectField";
import { useCategory } from "@/contexts/categoryContext";

export default function AdDetails({
  id,
  title,
  description,
  owner,
  location,
  price,
  picture,
  createdAt,
  category,
  tags,
  updateAds,
}: AdDetailsProps) {
  const createdAtTransform = new Date(createdAt).toLocaleDateString("fr-FR");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const { basket, toggleItemBasket } = useBasket();
  const { updateCategories } = useCategory();
  const [isEditing, setIsEditing] = useState(false);
  const [categoriesAll, setCategoriesAll] = useState<OptionType[]>([]);
  const [tagsAll, setTagsAll] = useState<OptionType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SingleValue<OptionType>>(null);
  const [selectedTags, setSelectedTags] = useState<MultiValue<OptionType>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const { data: categoriesQuery } = useQuery(GET_ALL_CATEGORIES_QUERY);
  const { data: tagsQuery } = useQuery(GET_ALL_TAGS_QUERY);

  const isAdded = basket.some((item) => item.id === id);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categories = await categoriesQuery?.getAllCategories;
        console.log(categories);

        setCategoriesAll(
          categories?.map((category: CategoryProps) => ({
            value: category.name,
            label:
              category.name.charAt(0).toUpperCase() + category.name.slice(1),
          })) ?? []
        );

        const tags: TagProps[] | undefined = await tagsQuery?.getAllTags;
        setTagsAll(
          tags?.map((tag: TagProps) => ({
            value: tag.name,
            label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
          })) ?? []
        );
      } catch (error) {
        console.error("Failed to fetch categories and tags:", error);
        setError("Failed to fetch categories and tags");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const handleToggleBasket = () => {
    toggleItemBasket({ id, price });
  };

  const handleDeleteAd = async () => {
    try {
      await adService.deleteAd(id);
      updateAds(true);
    } catch (error) {
      console.error("Failed to delete ad:", error);
      setError("Failed to delete ad");
    }
  };

  const handleEditAd: SubmitHandler<FormData> = async (data) => {
    try {
      await adService.updateAd(id, data);
      setIsEditing(false);
      updateAds(false);
      updateCategories();
    } catch (error) {
      console.error("Failed to update ad:", error);
      setError("Failed to update ad");
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
    setValue("title", title);
    setValue("description", description);
    setValue("owner", owner);
    setValue("price", price);
    setValue("picture", picture);
    setValue("location", location);
    setValue("category", category.name);
    setSelectedCategory({ value: category.name, label: category.name });
    setSelectedTags(tags?.map((tag) => ({ value: tag.name, label: tag.name })));
  };

  return (
    <div className={styles["ad-details-container"]}>
      {loading && <Loader />}
      <span
        className={styles["ad-details-delete-button"]}
        onClick={handleDeleteAd}
      >
        X
      </span>
      {isEditing ? (
        <div className={styles2["new-ad-container"]}>
          <form
            onSubmit={handleSubmit(handleEditAd)}
            className={styles2["new-ad-form"]}
          >
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
              options={categoriesAll}
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
              options={tagsAll}
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
            <div className={styles["ad-card-button-edit-container"]}>
              <Button
                label="Valider la modification"
                stylesName="ad-card-button-edit-validate"
                onClickButton={() => {}}
              />
              <Button
                label="Annuler la modification"
                stylesName="ad-card-button-edit-cancel"
                onClickButton={() => setIsEditing(false)}
              />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className={styles["ad-details-title"]}>{title}</h1>
          {description && (
            <div className={styles["ad-details-description"]}>
              {description}
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className={styles["ad-details-tags"]}>
              Mots clés: {tags.map((tag) => tag.name).join(", ")}
            </div>
          )}
          <div className={styles["ad-details-category"]}>
            Catégorie: {category.name}
          </div>
          <div className={styles["ad-details-owner"]}>Vendeur: {owner}</div>
          <div className={styles["ad-details-location"]}>
            Localisation: {location}
          </div>
          <div className={styles["ad-details-price"]}>Prix: {price} €</div>
          {picture ? (
            <img className={styles["ad-details-image"]} src={picture} />
          ) : (
            <img
              className={styles["ad-details-image"]}
              src="https://via.placeholder.com/200"
            />
          )}
          <div className={styles["ad-details-created-at"]}>
            Annonce crée le : {createdAtTransform}
          </div>
        </div>
      )}
      <div className={styles["ad-details-button-container"]}>
        {isAdded ? (
          <Button
            label="Supprimer du panier"
            stylesName="ad-card-button-remove"
            onClickButton={handleToggleBasket}
          />
        ) : (
          <Button
            label="Ajouter au panier"
            stylesName="ad-card-button-add"
            onClickButton={handleToggleBasket}
          />
        )}
        {!isEditing && (
          <Button
            label="Modifier l'annonce"
            stylesName="ad-card-button-edit"
            onClickButton={handleEditButtonClick}
          />
        )}
      </div>
    </div>
  );
}
