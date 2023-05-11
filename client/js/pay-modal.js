const $orderBtn = document.querySelector('.order-btn');
const $modalDisplay = document.querySelector('.pay-modal-container');
const $resultCheck = document.querySelector('.pay-result-check');
const $resultCancel = document.querySelector('.pay-result-cancel');

// 결제 모달 띄우기 관련 이벤트
$orderBtn.onclick = () => {
    if (!$('.order-item').length) return;
  
    $modalDisplay.classList.replace('modal-invisible', 'modal-visible');
  };
  
  // 결제 모달에서 확인 시 웹 초기화
  $resultCheck.onclick = () => {
    window.location.reload();
  };
  
  // 결제 모달에서 취소 시 모달창 close
  $resultCancel.onclick = () => {
    $modalDisplay.classList.replace('modal-visible', 'modal-invisible');
  };
  