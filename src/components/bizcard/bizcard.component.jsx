import "./bizcard.component.css";

const BizCardComponent = ({
  bizName,
  bizDescription,
  bizImage,
  bizPhone,
  bizAddress,
  _id,
  onDelete,
  onEdit,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(_id);
  };
  const handleEditBtnClick = () => {
    onEdit(_id);
  };
  return (
    <div class="team-boxed">
      <div class="row people">
        <div class="item">
          <div class="box">
            <img class="rounded-circle" src={bizImage} />
            <h3 class="name">{bizName}</h3>
            <p class="title">{bizPhone}</p>
            <p class="title">{bizAddress}</p>
            <p class="description">{bizDescription}</p>
            <div class="social">
              <button
                className="card-link btn btnEditColor mx-2"
                onClick={handleEditBtnClick}
              >
                Edit
              </button>
              <button
                className="card-link btn btnDeleteColor mx-2"
                onClick={handleDeleteBtnClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BizCardComponent;
