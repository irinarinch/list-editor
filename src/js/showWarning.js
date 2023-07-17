import swal from 'sweetalert';

export default function showWarning(actions) {
  swal({
    title: 'Вы уверены?',
    text: 'После удаления вы не сможете восстановить товар',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal('Товар удален', {
          icon: 'success',
        });
        actions();
      } else {
        swal('Товар не был удален!');
      }
    });
}
